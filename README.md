# ReactJS Beginner
- Khởi tạo project: npm create vite@latest
- khởi tạo packet: npm i

# Chạy file theo môi trường conda
- source ~/anaconda3/etc/profile.d/conda.sh
- conda activate base

# Alembic cho Migrations
- Khởi tạo alembic: alembic init tên_alembic
- Tạo tệp tự động: alembic revision --autogenerate -m "[Ghi chú]"
- Cập nhật migrations: alembic upgrade head
- Lùi phiên bản migrations: alembuc downgrade -1