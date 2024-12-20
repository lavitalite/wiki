CREATE Table users (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL
)

CREATE TABLE deparments (
  departmentId VARCHAR(255) PRIMARY KEY,
  departmentName VARCHAR(255) NOT NULL,
  parentDeparmentId VARCHAR(255),
  userId VARCHAR(255),
  Foreign Key (parentDepartmentId) REFERENCES departments(departmentId),
  Foreign Key (userId) REFERENCES users(id)
)


--- Insert users

INSERT INTO users (id,name) VALUES
('0000021-00000000000000000000000000000001', '系统管理元员')