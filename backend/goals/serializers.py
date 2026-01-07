from rest_framework import serializers
from .models import Goal

class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = [
            "id",
            "title",
            "type",
            "target",
            "progress",
            "completed",
            "streak",
            "last_done_at",
            "created_at",
        ]
        read_only_fields = ["id", "completed", "streak", "created_at"]
