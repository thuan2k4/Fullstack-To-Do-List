"""Remove token_expired row in user table

Revision ID: 5eefc0b6d16a
Revises: ff76dad73be0
Create Date: 2025-04-25 20:59:36.983950

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '5eefc0b6d16a'
down_revision: Union[str, None] = 'ff76dad73be0'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'token_expiry')
    # ### end Alembic commands ###


def downgrade() -> None:
    """Downgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('token_expiry', sa.DATETIME(), nullable=True))
    # ### end Alembic commands ###
