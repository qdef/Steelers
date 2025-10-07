import uuid

from django.db import models
from django.contrib.auth.models import User


class Game(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    opponent = models.CharField(max_length=50)
    opponent_logo = models.ImageField(
        upload_to='team_logos/',
        default='team_logos/nfl.png',
    )
    sold_out = models.BooleanField(default=False)
    game_date = models.DateTimeField()

    class Meta:
        ordering = ['game_date']

    @property
    def game_title(self):
        return f"Steelers vs {self.opponent}"

    def __str__(self):
        return f"Steelers vs {self.opponent} ({self.game_date.date()})"


class Order(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        User,
        related_name="orders",
        on_delete=models.CASCADE
    )
    game = models.ForeignKey(
        Game,
        related_name="orders",
        on_delete=models.CASCADE
    )

    quantity = models.IntegerField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    creation_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-creation_date']
    
    @property
    def game_date(self):
        return self.game.game_date
    
    @property
    def game_title(self):
        return self.game.game_title
    
    def __str__(self):
        return f"{self.game_title}: {self.quantity} tickets for ${self.total_price}"
