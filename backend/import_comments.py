import os
import json
import django
from datetime import datetime

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from api.models import Comment


def run_import():
    file_path = 'comments.json'

    if not os.path.exists(file_path):
        print(f"Cannot find the file: {file_path}")
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        comments = data.get('comments', [])

    for c in comments:
        dt = datetime.strptime(c['date'], "%Y-%m-%dT%H:%M:%SZ")

        Comment.objects.create(
            author=c['author'],
            text=c['text'],
            date=dt,
            likes=c['likes'],
            image=c['image']
        )
        print(f"已导入来自 {c['author']} 的评论")


if __name__ == '__main__':
    run_import()