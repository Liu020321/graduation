"""empty message

Revision ID: 8b9915868305
Revises: 1c96623d1d32
Create Date: 2024-04-05 13:57:27.271969

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8b9915868305'
down_revision = '1c96623d1d32'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('doctor',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('department', sa.String(length=100), nullable=False),
    sa.Column('schedule', sa.String(length=100), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('appointment',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('doctor_id', sa.Integer(), nullable=False),
    sa.Column('time', sa.DateTime(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(length=255), nullable=False),
    sa.Column('isRepeat', sa.Integer(), nullable=False),
    sa.Column('status', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['doctor_id'], ['doctor.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('appointment')
    op.drop_table('doctor')
    # ### end Alembic commands ###
