# Generated by Django 3.0.6 on 2020-08-18 05:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('timers', '0004_timer_current_cycle'),
    ]

    operations = [
        migrations.RenameField(
            model_name='timer',
            old_name='completed_focus_counter',
            new_name='completed_focus_minutes',
        ),
        migrations.RemoveField(
            model_name='timer',
            name='logged_focus_minutes',
        ),
        migrations.AddField(
            model_name='timer',
            name='is_started',
            field=models.BooleanField(default=False),
        ),
    ]