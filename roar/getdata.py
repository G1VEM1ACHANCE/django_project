import sqlite3
import subprocess
from apscheduler.schedulers.blocking import BlockingScheduler
from pymongo import MongoClient
from datetime import datetime
def record_mongo():
    client = MongoClient("localhost:27017")
    db = client.record
    data = db.data
    data.insert_one({"datetime":datetime.now()})
    return

def delete_and_update():
    conn = sqlite3.connect('db.sqlite3')
    cursor = conn.cursor()
    cursor.execute('DELETE FROM operation_event')
    
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name LIKE 'operation%'")
    tables = cursor.fetchall()

        # Iterate through the tables and delete all records
    for table in tables:
        table_name = table[0]
        cursor.execute(f"DELETE FROM {table_name}")
        print(f"All records deleted from {table_name}")
    conn.commit()
    conn.close()
    result = subprocess.run(['python3', 'manage.py',"insert_data"], capture_output=True, text=True)
    record_mongo()
    print("update complete")

if __name__ == '__main__':
    scheduler = BlockingScheduler()
    # Schedule the job to run every day at 1:00 AM
    scheduler.add_job(delete_and_update, 'cron', hour=15,minute=00)
    # delete_and_update()
    #connect_mongo()
    scheduler.start()
