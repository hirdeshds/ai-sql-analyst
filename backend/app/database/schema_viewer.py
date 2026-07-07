from backend.app.database.connection import get_db_connection
def get_schema_data():
    db = get_db_connection()
    schema_data = {}
    metadata = db.get_metadata()
    for table_name, table in metadata.tables.items():
            schema_data[table_name] = [
                {"name": col.name, "type": str(col.type)} 
                for col in table.columns
            ]
    return schema_data