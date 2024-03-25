"""empty message

Revision ID: 5d38becf9f38
Revises: a669e891ee83
Create Date: 2024-03-24 16:10:44.598685

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '5d38becf9f38'
down_revision = 'a669e891ee83'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('medical_picture', schema=None) as batch_op:
        batch_op.add_column(sa.Column('submitImage', sa.String(length=255), nullable=False))
        batch_op.add_column(sa.Column('outputImage', sa.String(length=255), nullable=True))
        batch_op.drop_column('medicalImage')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('medical_picture', schema=None) as batch_op:
        batch_op.add_column(sa.Column('medicalImage', mysql.VARCHAR(length=255), nullable=False))
        batch_op.drop_column('outputImage')
        batch_op.drop_column('submitImage')

    # ### end Alembic commands ###