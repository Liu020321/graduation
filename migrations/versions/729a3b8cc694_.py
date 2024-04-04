"""empty message

Revision ID: 729a3b8cc694
Revises: 4419866520cb
Create Date: 2024-04-03 19:59:52.999732

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '729a3b8cc694'
down_revision = '4419866520cb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('appointment', schema=None) as batch_op:
        batch_op.add_column(sa.Column('isRepeat', sa.Integer(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('appointment', schema=None) as batch_op:
        batch_op.drop_column('isRepeat')

    # ### end Alembic commands ###
