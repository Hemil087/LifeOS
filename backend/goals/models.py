from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Goal(models.Model):
    GOAL_TYPE_CHOICES = [
        ("daily", "Daily"),
        ("monthly", "Monthly"),
        ("yearly", "Yearly"),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="goals"
    )
    title = models.CharField(max_length=255)
    type = models.CharField(max_length=10, choices=GOAL_TYPE_CHOICES)
    target = models.PositiveIntegerField()
    progress = models.PositiveIntegerField(default=0)
    completed = models.BooleanField(default=False)
    streak = models.PositiveIntegerField(default=0)
    last_done_at = models.DateField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.user.username})"
    def save(self, *args, **kwargs):
        if self.progress >= self.target:
            self.completed = True
            if not self.last_done_at:
                self.last_done_at = self.last_done_at or timezone.now().date()
        else:
            self.completed = False
        super().save(*args, **kwargs)

