# Generated by Django 5.0.6 on 2024-06-09 12:16

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("operation", "0004_alter_showinfo_price"),
    ]

    operations = [
        migrations.AlterField(
            model_name="event",
            name="uid",
            field=models.CharField(
                default=uuid.uuid4, max_length=50, primary_key=True, serialize=False
            ),
        ),
    ]
