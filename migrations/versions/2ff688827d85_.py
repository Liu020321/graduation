"""empty message

Revision ID: 2ff688827d85
Revises: 459c021b8fb9
Create Date: 2024-03-31 13:33:25.003797

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2ff688827d85'
down_revision = '459c021b8fb9'
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
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('UserMessage')
    # ### end Alembic commands ###
