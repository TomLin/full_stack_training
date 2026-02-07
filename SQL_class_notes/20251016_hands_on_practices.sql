-- use ig_app;

-- 題目01
select top 5 * 
from users
order by created_at desc
;


-- 題目02
select datename(weekday, created_at) as week_name, count(*) as num_registers
from users
group by datename(weekday, created_at)
order by count(*) desc
;

-- 題目03
select u.username, p.image_url
from users u
left join photos p
	on u.id = p.user_id
where image_url is null;

-- 題目04
declare @most_photo_id int;
select top 1 @most_photo_id =  photo_id 
from likes
group by photo_id
order by count(user_id) desc;

select id, username, created_at, @most_photo_id as most_photo_id
from users
where id = (select user_id from photos where id = @most_photo_id);

-- 題目06
select p.tag_id, t.tag_name, count(p.photo_id) cnt_photo_id, dense_rank()  over (order by count(p.photo_id) desc) as top_rank
from photo_tags p
left join tags t
on p.tag_id = t.id
group by p.tag_id, t.tag_name
;


-- 題目07
select count(*) from photos; -- 257

select username, count(*)
from likes
join users
on likes.user_id = users.id
group by username
having count(*) = (select count(*) from photos)
order by count(*) desc
;







