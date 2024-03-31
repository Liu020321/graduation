"""empty message

Revision ID: 459c021b8fb9
Revises: 4d2d76e92bb6
Create Date: 2024-03-31 13:32:04.924852

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '459c021b8fb9'
down_revision = '4d2d76e92bb6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('UserMessage',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('userHead', sa.String(length=255), nullable=False),
    sa.Column('name', sa.String(length=20), nullable=False),
    sa.Column('age', sa.Integer(), nullable=False),
    sa.Column('sex', sa.Integer(), nullable=False),
    sa.Column('asset', sa.String(length=255), nullable=False),
    sa.Column('phone', sa.String(length=11), nullable=False),
    sa.Column('idCard', sa.BigInteger(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('idCard')
    )
    with op.batch_alter_table('usermessage', schema=None) as batch_op:
        batch_op.drop_index('idCard')

    op.drop_table('usermessage')
    with op.batch_alter_table('medical_picture', schema=None) as batch_op:
        batch_op.add_column(sa.Column('pdf_path', sa.String(length=255), nullable=True))
        batch_op.add_column(sa.Column('docx_path', sa.String(length=255), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('medical_picture', schema=None) as batch_op:
        batch_op.drop_column('docx_path')
        batch_op.drop_column('pdf_path')

    op.create_table('usermessage',
    sa.Column('id', mysql.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('user_id', mysql.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('userHead', mysql.VARCHAR(length=255), nullable=False),
    sa.Column('name', mysql.VARCHAR(length=20), nullable=False),
    sa.Column('age', mysql.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('sex', mysql.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('asset', mysql.VARCHAR(length=255), nullable=False),
    sa.Column('phone', mysql.VARCHAR(length=11), nullable=False),
    sa.Column('idCard', mysql.BIGINT(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], name='usermessage_ibfk_1'),
    sa.PrimaryKeyConstraint('id'),
    mysql_collate='utf8mb4_0900_ai_ci',
    mysql_default_charset='utf8mb4',
    mysql_engine='InnoDB'
    )
    with op.batch_alter_table('usermessage', schema=None) as batch_op:
        batch_op.create_index('idCard', ['idCard'], unique=True)

    op.drop_table('UserMessage')
    # ### end Alembic commands ###