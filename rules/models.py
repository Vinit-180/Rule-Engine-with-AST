from django.db import models

# Create your models here.
class Rule(models.Model):
    rule_name=models.CharField(max_length=255)
    ast=models.JSONField()
    created_at=models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.rule_name