"""empty message

Revision ID: a669e891ee83
Revises: 64e83c237dfc
Create Date: 2024-03-18 13:40:16.548956

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'a669e891ee83'
down_revision = '64e83c237dfc'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('medical_picture', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.Integer(), nullable=False))
        batch_op.drop_constraint('medical_picture_ibfk_2', type_='foreignkey')
        batch_op.drop_constraint('medical_picture_ibfk_1', type_='foreignkey')
        batch_op.create_foreign_key(None, 'user', ['user_id'], ['id'])
        batch_op.drop_column('age')
        batch_op.drop_column('name')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('medical_picture', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', mysql.VARCHAR(length=20), nullable=False))
        batch_op.add_column(sa.Column('age', mysql.INTEGER(), autoincrement=False, nullable=False))
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('medical_picture_ibfk_1', 'user', ['age'], ['age'])
        batch_op.create_foreign_key('medical_picture_ibfk_2', 'user', ['name'], ['name'])
        batch_op.drop_column('user_id')

    # ### end Alembic commands ###
