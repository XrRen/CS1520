from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import declarative_base
import datetime as dt

Base = declarative_base()

class Order(Base):
    __tablename__ = 'orders'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    customer_name = Column(String, nullable=False)
    table_number = Column(Integer, nullable=False)
    orders = Column(String, nullable=False)
    date_created = Column(DateTime, default=dt.datetime.utcnow, nullable=False)


