mysql -u root -proot -e "drop database if exists `agile-board`; create database `agile-board`"
mysql -u root -proot agile-board < schema.sql
mysql -u root -proot agile-board < test-data.sql
