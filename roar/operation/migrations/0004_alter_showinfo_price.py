# Generated by Django 5.0.6 on 2024-06-06 08:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("operation", "0003_alter_event_edit_modify_date"),
    ]

    operations = [
        migrations.AlterField(
            model_name="showinfo",
            name="price",
            field=models.CharField(blank=True, max_length=50),
        ),
    ]
