INSERT INTO `agile-board`.`user` (`id`, `name`) VALUES 
(1, 'Judith'), (2, 'Oliver'), (3, 'Jonah'), (4, 'Aliyah'), (5, 'Trevor'), (6, 'Karine');

INSERT INTO `agile-board`.`project` (`id`, `archived`, `name`, `description`) VALUES 
(1, 0, 'My Awesome Project', 'This project is absolutely awesome!'),
(2, 0, 'My Amazing Project', 'This project is absolutely amazing!');

INSERT INTO `agile-board`.`sprint` (`id`, `projectId`, `state`, `description`) VALUES
(1, 1, 'open', 'Backlog'),
(2, 1, 'open', 'Sprint 1');

INSERT INTO `agile-board`.`ticket` (`id`, `sprintId`, `points`, `priority`, `state`, `type`, `summary`, `description`) VALUES 
(1, 1, 5, 1, 'to-do', 'story', 'Do something', ''),
(2, 1, 0, 2, 'to-do', 'bug', 'Fix something', ''),
(3, 1, 2, 3, 'in-progress', 'task', 'Long long long long long task summary', 'It is a very long task description, because our PO loves to talk and talk and talk again, it is very annoying. I do not like t at all. Fortunately there are scrollbars, weehoo!'),
(4, 1, 0, 4, 'to-review', 'bug', 'Fix something', ''),
(5, 1, 2, 5, 'to-test', 'task', 'Do something', ''),
(6, 1, 0, 6, 'done', 'bug', 'Fix something', '');

INSERT INTO `agile-board`.`ticket_assignee` (`userId`, `ticketId`) VALUES
(1, 1), (1, 2), (2, 1), (2, 6), (3, 3), (3, 5), (4, 4);