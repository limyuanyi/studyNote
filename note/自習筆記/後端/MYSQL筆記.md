# 概述

## 登錄

（1）到window 去找 （MySQL 8.0 Command Line Client - Unicode）進入后輸入密碼

（2）去電腦屬性設置高級設定，添加path（在ProgramFiles下的MySQL裏的server的bin路徑），然後再通過管理員進入cmd，輸入(mysql -u root -p)啓動

在cmd内科通過net start mysql/net stopmysql進行啓動停止 或win+R輸入services.msc 進行操作

## 類型

### 數值

- TINYINT           1bit
- SMALLINT          2bit
- MEDIUMINT         3bit
- INT / INTEGER     4bit
- BIGINT            8bit
- FLOAT             4bit
- DOUBLE            8bit
- DECIMAL(M精度，D標度)

exp: age TINYINT UNSIGNED
        score double(4,1)(整體長度，小數)

### 字符串

- CHAR 固定空間
- VARCHAR 動態空間
  不常用
- TINYLOB
- TINYTEXT
- BLOB
- TEXT
- MEDIMBLOB
- MEDIUMTEXT
- LONGBLOB
- LONGTEXT

exp: username varchar(50)
        gender char(1)

### 日期類型

- DATE
- TIME
- YEAR
- DATETIME
- TIMESTAMP 時間戳（最大到2038-01-19 03：14：07）

exp: birthday DATE

1. 查詢
* show databases; 
2. 創建
* create database [if not exists] filename [default charset 字符集] [callate排序規則]; 
  
  > :字符集推薦使用utf8mb4,不推薦utf8
3. 刪除
* drop database [if exists] filename;
4. 使用
* use filename;
5. 查看（當前數據庫）
* select database(); 

# SQL

## DDL

(data definition language)

### DDL-表操作-查詢

1. 查詢
* show tables;
2. 創建
* create table tableName(字段1 類型 [comment注釋])
  
  > create table tb_user(
  >   -> id int comment '編號',
  >   -> name varchar(50) comment '姓名',
  >   -> age int comment '年齡',
  >   -> gender varchar(1) comment '性別'
  >   -> ) comment '用戶表';
3. 查詢（表結構）
* desc tableName;
3. 查詢指定（表的建表語句）
* show create table tableName;

### DDL-表操作-修改

1. 添加字段
   alter table 表名 add 字段名 類型 [comment注釋]；
2. 修改類型
   alter table 表名 modify 字段名 新類型；
3. 修改字段名和類型
   alter table 表名 change 舊字段名 新字段名 新類型 [comment注釋] [約束];
4. 刪除
   alter table 表名 drop 字段名;
5. 修改表名
   alter table 表名 rename to 新表名；
6. 刪除表
   drop table [if exists] 表名；
7. 刪除表並重新創建該表（初始化清空表數據）
   truncate table 表名;

### DDL總結

1. DDL 數據庫操作:
   
   > 查詢，創建，使用，顯示，刪除（數據庫）

2. DDL 表操作:
   
   > 查詢，創建，顯示表結構，查詢建表語句
   > 添加，修改，替換，刪除（字段名及類型）
   > 修改，刪除，刪除並重建（表）

## DML

(Data Manipulation Language)

### DML-添加數據

1. 給指定字段添加數據
   insert into 表名(字段1，字段2，...) values(值1，值2，..)

2. 給全部字段添加數據
   insert into 表名 values(值1，值2，...)
   3.批量添加數據
   insert into 表名(字段1，字段2，...) values(值1，值2，..),(值1，值2，..);
   insert into 表名 values(值1，值2，..),(值1，值2，..);
   
   > 字符串和日期數據應包含在引號内。
   > 插入數據大小應在字段規定範圍内。
   > 插入數據，字段和值一一對應。

### DML-修改數據

update 表名 set 字段1=值1,字段2=值2,...[where 條件];

### DML-刪除數據

delete from 表名 [where條件];

> 如果沒有條件，將會刪除整張表的所有數據
> 不能刪除某一個字段的值(可以使用update);

### DML-總結

> 添加，修改，刪除 (表數據内容)

## DQL

### DQL-語法

select 字段列表 
from 表名列表
where 條件列表 
group by 分組字段列表
having 分組后條件列表
order by 排序列表
limit 分頁參數

* 基本查詢
* 條件查詢（where）
* 聚合函數（count,max,min,avg,sum）
* 分組查詢（group by）
* 排序查詢（order by）
* 分頁查詢（limit）

### DQL-基本查詢

1. 查詢多個字段
   select 字段1，字段2，... from 表名;
   select * from 表名;
2. 設置別名
   select 字段1[as 別名],字段2[as 別名2] ... from 表名;
   3.去除重複記錄
   select distinct 字段列表 from 表名;

### DQL-條件查詢

select 字段列表 from 表名 where 條件列表;

條件: 
<=, >, >=, <, =,
between...and... , in(...), like 占位符, is null,
and\&&, OR\||, NOT\!

### DQL-聚合函數

select 聚合函數(字段列表) from 表名;

常見聚合函數
count,max,min,avg,sum

> null值不參與運算

### DQL-分組查詢

select 字段列表 from 表名 [where條件] group by 分組字段名[having 分組后過濾條件]

where是分組前過濾，having是分組后過濾。
where不能對聚合函數判斷，having可以。
執行順序:where>聚合函數>having
分組之後，查詢字段會分爲聚合函數和分組字段，查詢其他字段無意義。

### DQL-排序查詢

select 字段列表 from 表名 order by 字段1 排序方式1，字段2 排序方式2;

排序方式

> ASC升序(默認)，DESC降序
> 多字段以第一字段優先

### DQL-分頁查詢

select 字段列表 from 表名 limit 起始索引,查詢記錄數;

起始索引是index從0開始
分頁查詢，不同數據庫有不同的實現，MySQL是limit
如果查詢第一頁,起始索引可以忽略

### DQL-執行順序

1 from 2 where 3 groupby 4 select 5 orderby 6 limit

### DQL-總結

共有6種查詢
select 字段列表 from 表名 where 條件列表 group by 分組字段列表 having 分組后條件列表 order by 排序字段列表 limit 分頁參數

* 基本查詢
* 條件查詢
* 聚合函數
* 分組查詢
* 排序查詢
* 分頁查詢

## DCL

Data control Language （管理用戶及權限）

### DCL-管理用戶

1. 查詢用戶
   use mysql;
   select * from user;

2. 創建用戶
   create user '用戶名'@'主機名' identified by '密碼';

3. 修改用戶密碼
   alter user '用戶名'@'主機名' identified with mysql_native_password by '新密碼';

4. 刪除用戶
   drop user '用戶名'@'主機名';

> 主機名可以用%通配，代表任意主機
> 這類SQL主要是DBA(Database Adminstrator數據庫管理員)使用

### DCL-權限控制

常用權限:
ALL,ALL PRIVILEGES(所有權限)
SELECT
INSERT
UPDATE
DELETE
ALTER
DROP
CREATE

1. 查詢權限
   show grants for '用戶名'@'主機名';

2. 授予權限
   grant 權限列表 on 數據庫名 表名 to '用戶名'@'主機名';

3. 撤銷權限
   revoke 權限列表 on 數據庫名 表名 from '用戶名'@'主機名';
   
   > 多個權限用逗號分割，可用*進行通配

### DCL-總結

1. 用戶管理 （創建，修改密碼，刪除）
2. 權限控制（查詢，授予權限，撤銷權限）

# 函數

## 字符串函數

拼接：concat(s1,s2,...,sn)
轉大寫：upper(str)
轉小寫：lower(str)
左填充：lpad(str,b,pad)
右填充：rpad(str,n,pad)
去除頭尾空格：trim(str)
副字符串：substring(str,start,len) 索引從1開始

## 數值函數

向上取整：ceil(x)
向下取整：floor(x)
x/y的餘數：mod(x,y)
隨機數(0-1)：rand()
x四舍6入的值，保留y位小數：round(x,y)
![alt text](image.png)

## 日期函數

![alt text](image-1.png)

## 流程控制函數

![alt text](image-2.png)

## 總結

![alt text](image-4.png)

# 約束

限制表中的數據
分類：非空約束，唯一約束，主鍵約束，默認約束，檢查約束，外鍵約束
![alt text](image-5.png)

> 可在創建時或修改表中數據時添加約束
> ![alt text](image-6.png)

### 外鍵約束

讓兩張表的數據直接建立連接，保持數據的一致性及完整性
alter table 表名 add constraint 外鍵名稱 foreign key(外鍵字段) references 主表(主表列名)
![alt text](image-7.png)

刪除外鍵
alter table 表名 foreign key 外鍵名稱;
![alt text](image-8.png)
![alt text](image-9.png)

### 總結

非空約束not null，
唯一約束unique，
主鍵約束primary key(自增auto_increment)，
默認約束default，
檢查約束check，
外鍵約束foreign key (刪除更新行爲cascade/set null)

# 多表查詢

## 多表關係

* 一對多（多對一）
  ![alt text](image-11.png)
  部門可以對應多個員工
* 多對多
  ![alt text](image-12.png)
  一個學生可以選修多門課，一門課也可被多個學生選擇
* 一對一

## 概述

從多張表進行查詢
select * from table1,table2;

- 笛卡爾積
  兩個集合的所有組合情況
  (因此需要消除無效的笛卡爾積)
  select * from table1,table2 where table1.dept_id = dept.id

## 内連接

- 隱式内連接
  select 字段列表 from 表1,表2 where 條件...;

- 顯式内連接
  select 字段列表 from 表1 [inner] join 表2 on 連接條件...;
  
  ## 外連接

- 左外鏈接
  select 字段列表 from 表1 left [outer] join 表2 on 條件...;

- 右外連接
  select 字段列表 from 表1 right [outer] join 表2 on 條件...;

## 自連接

select 字段列表 from 表A 別名A join 表A 別名B on 條件...;

## 聯合查詢

union,union all
select 字段列表 from 表A ...
union[all]
select 字段列表 from 表B ...;
多張表的列數必須保持一致，
union all不會去重，union會去重

## 子查詢

SQL語句嵌套select語句，稱爲嵌套查詢，又稱子查詢
select * from t1 where column1 = (selet column1 from t2);
(子查詢外部語句可以是insert/update/delete/select)

- 標量子查詢(結果返回為單個值)
- 列子查詢(子查詢結果為一列)
- 行子查詢(子查詢結果為一行)
- 表子查詢(子查詢結果為多行多列)

根據子查詢位置，分爲: where之後，from之後, select之後.

### 標量子查詢

常見操作符: >, >=, ==, <= ,<

### 列子查詢

常見操作符：in, not in, any, some, all

### 行子查詢

常見操作符：=, <>, in, not in

### 表子查詢

常見操作符：in

## 多表查詢案例

## 總結

1. 多表關係
   ![alt text](image-13.png)
2. 多表查詢
   ![alt text](image-14.png)

# 事務

## 

-- 方式一

* 查看/設置事務提交方式
  select @@autocommit;
  set @@autocommit = 0;
* 提交事務
  commit;
* 回滾事務
  rollback;

-- 方式二

* 開啓事務
  start transaction 或 begin;
* 提交事務
  commit;
* 回滾事務;
  rollback;

## 四大特性(ACID)

1. 原子性:事務不可分割，要麽全部成功或失敗
2. 一致性:事務完成時，數據必須保持一致狀態
3. 隔離性:隔離機制，不受外部並發操作影響，獨立運行
4. 持久性L事務一旦提交或回滾，對數據的改變是永久的。
   ![alt text](image-15.png)

## 并發事務問題

1. 髒讀:一個事務讀到另一個事務還沒有提交的數據
2. 不可重複讀:一個事務先後讀取同一條記錄，但兩次讀取的數據不同，稱之爲不可重複讀。
3. 幻讀:一個事務按照條件查詢數據時，沒有對應的數據行，但是在插入數據時，又發現這行數據已經存在，好像出現了幻影。

## 隔離級別

![](image-16.png)

* 查看事務隔離級別
  select @@transaction_isolation;
* 設置事務隔離級別
  set [session|global] transaction isolation level 
  {read uncommitted | read committed | repeatable read | serializable}

!!事務隔離級別越高，數據越安全，性能越低

## 總結

![alt text](image-17.png)

# 存儲引擎

是基於表的，而不是基於數據庫，
因此一張數據庫可以有多個表基於不同的存儲引擎。
默認引擎為INNODB

1. 創建表，指定引擎
   create table 表名( )engine = innodb [comment 表注釋];

2. 查詢引擎
   show engines;
   常見引擎：InnoDB/MyISAM/MEMORY

## InnoDB

可靠性高及高性能的通用存儲引擎，是目前MySQL默認的存儲引擎

特點

- DML操作遵循ACID模型，支持事務
- 行級鎖，提高并發訪問性能
- 支持外鍵FOREIGN KEY 約束，保持數據的完整性以及正確性

文件

- xxx.ibd:存儲該表的表結構(frm.sdi),數據和索引
- 參數:innodb_file_per_table

## MyISAM

MySQL早期的默認存儲引擎

特點

- 不支持事務，不知此外鍵
- 支持表鎖，不支持行鎖
- 訪問速度快

文件

- xxx.sdi:存儲表結構信息
- xxx.MYD:存儲數據
- xxx.MYI:存儲索引

## Memory

數據存儲在内存中，由於受到硬體問題或斷電問題影響，只能將這些表作爲臨時表或緩存使用。

特點

- 内存存放
- hash索引(默認)

文件

- xxx.sdi:存儲表結構信息

![alt text](image-18.png)

## 適用場景

![alt text](image-19.png)

目前很少使用MyISAM和Memory了
分別被mangodb和redis替代了(noSQL數據庫)

## 總結

體系結構:連接層，服務層，引擎層，存儲層
存儲引擎的簡介，特點，應用場景

# 索引

B+tree(InnoDB)
hash(Memory)

## 索引的分類

- 主鍵索引 PRIMARY（默認創建，只能有一個）
- 唯一索引 UNIQUE
- 常規索引
- 全文索引 FULLTEXT

InnoDB根據索引的存儲形式可分爲兩種：

1. 聚集索引(Clustered Index) —— 必須有，且只有一個
2. 二級索引(Secondary Index)

聚集索引選取規則:

- 如果存在主鍵，主鍵索引就是聚集索引。
- 如果不存在，將使用第一個唯一索引作爲聚集索引。
- 如果都沒有，則InnoDB會自動生成一個rowid作爲隱藏的聚集索引
  ![alt text](image-20.png)

囘表查詢

- 先通過二級索引找到對應的id，再通過id在聚集索引内找到對應的row數據

## 索引語法

- 創建索引
  create [UNIQUE | FULLTEXT] index 索引名 on 表名 (字段名,...);
  
  > 單列索引：一個索引只關聯一個字段
  > 聯合索引/組合索引：一個索引關聯多個字段

- 查看索引
  show index from 表名[\G];
  -\G：縱向顯示

- 刪除索引
  drop index 索引名 on 表名;
  ![alt text](image-21.png)

## SQL性能分析

- 爲了做SQL優化（查詢語句）
  show global status like 'Com_______';
1. SQL執行頻率

2. 慢查詢日志
   show variables like 'slow_query_log';
- 記錄所有執行時間超過指定參數的SQL語句

如果要开启慢查询日志，需要在MySQL的配置文件（/etc/my.cnf）中配置如下信息：

> 开启MySQL慢日志查询开关
> slow_query_log=1
> 设置慢日志的时间为2秒，SQL语句执行时间超过2秒，就会视为慢查询，记录慢查询日志
> long_query_time=2

配置完毕之后，通过以下指令重新启动MySQL服务器进行测试，查看慢日志文件中记录的信息

> systemctl restart mysqld

目錄路徑在 /var/lib/mysql ,有一個文件叫 '主機名-slow.log'
可通過 tail -f 主機名-slow.log 來追蹤

3. profile詳情
   select @@have_profiling;
   -查看是否支持profile操作

select @@profiling;
-查看是否開啓

set [ session/global ] profiling = 1;
-設置開啓/關閉

show profiles
-瞭解時間都耗費在哪裏。

show profile [cpu] for query query_id;
-查看指定的SQL語句各個階段的耗時情況

4. explain執行計劃
   直接在select語句之前加上關鍵詞expain/desc;
   expain select 字段列表 from 表名 where 條件;

Explain 执行计划中各个字段的含义:
![alt text](image-22.png)

## 索引使用

- 最左前綴法則
  在索引了多列（聯合索引），在查詢時，必須從最左邊的開始，否則右邊的索引將會失效。
  索引了(a,b,c)：
  查詢(a,c)，a會成功，c會失效
  查詢(b,c)，b&c會失效
  查詢(a,b,c)，a&b&c會成功
  查詢(c,b,a)也會成功，因爲最左邊的必須存在，但是不關係位置。

如果出現範圍查詢(>,<)範圍查詢的右側列索引也會失效
可以使用(>=,<=)

### 失效情況

- 不要在索引列上運算，否則索引會失效
- 字符串不加引號，索引也會失效
- 頭部模糊匹配，索引會失效；尾部模糊匹配，索引不會失效
- or連接條件：必須前後條件中的列都有索引，否者索引會失效，不會使用索引查詢
- 數據分佈影響：如果MySQL評估使用索引比全表慢，則不會使用索引
  ：黨全表/大部分的數據都符合情況。

## SQL 提示

- 有多個索引的話：可以通過SQL提示來選擇要用哪一個索引

use index:指定索引

> expain select 字段列表 from 表名 use index(索引名) where條件；

ignore index:不使用

> expain select 字段列表 from 表名 ignore index(索引名) where條件；

force index:强制使用

> expain select 字段列表 from 表名 force index(索引名) where條件；

## 覆蓋索引

減少select * 的使用。
觀察 Extra
using index condition：查詢使用到了索引，但是需要回表查詢
using where;using index：查詢使用了索引，需要的數據在該索引都能找到（覆蓋索引）

## 前綴索引

黨處理比較長的字段時，可以藉助前綴索引
create index 索引名 on 表名(字段(n));
前綴長度：根據索引的選擇性(不重複的索引值base與數據表記錄總數的比值)來決定
選擇性越高，則查詢效率越高哦
select count(distinct email)/count(*) from tb_user;
select count(distinct substring(email,1.5))/count(*) from tb_user;

## 單列索引與聯合索引

- 推薦使用聯合索引

索引設計原則

- 數據量大，且查詢比較頻繁的表
- 針對與常作爲where, order by,group by操作的字段建立索引
- 選擇選擇區分度高的列表作爲索引，盡量建立唯一索引
- 如果是字符串的字段，且字段長度過長，可建立前綴索引
- 盡量使用聯合索引，減少單列索引，查詢時聯合索引可覆蓋索引，節省存儲空間，避免回表
- 要控制索引的數量，索引越多，維護索引結構的代價越大，影響增刪改的效率
- 如果索引列不能存儲NULL值，在建表時要使用not null來約束它。黨優化器知道每列是否可以包含null時，可更好地確定要使用哪個索引查詢

## 總結

![alt text](image-23.png)
![alt text](image-24.png)

# SQL優化

## 插入數據

- insert優化

批量插入

```
insert into 表名 values(),(),();
```

手動提交

```
start transaction;
insert into表名 values();
insert into表名 values();
insert into表名 values();
commit;
```

主鍵順序插入

- 大批量插入數據
  使用insert語句插入性能低，此時可以使用MySQL數據庫的load指令

```
#客戶端連接服務端時，加上參數--local-infile
mysql --local-infile -u root -p;
#設置全局參數local_infile為1，開啓從本地加載文件導入數據的開關
set global local_infile = 1;
#執行load指令，
load data local infile '/root/sql.log' into table 表名 fields terminated by ',' lines terminated by '/n';
```

## 主鍵優化

在InnoDB中，表數據根據主鍵順序組織存放的，這種存儲方式的表稱爲索引組織表(IOT)index organized table.

主鍵亂序插入
參數MERGE_THRESHOLD：合并頁的閥值(默認為頁的50%)

- 頁分裂現象
- 頁合并

主鍵設計原則：
-盡量降低主鍵長度
-插入數據時，盡量選擇順序插入，選擇使用AUTO_INCREMENT
-盡量不要使用UUID或者其他自然主鍵，如身份証號
-避免對主鍵的修改

## orderby優化

1. Using filesort：通過表索引和全表查詢讀取滿足條件的數據行，然後在排序緩衝區sort buffer中完成排序操作，所有不是通過索引直接返回排序結果的排序都叫FileSort排序。
2. Using index：通過有序索引順序掃描直接返回有序數據。

假如聯合索引内，一個升序排列一個降序排列會出現filesort,那就要在創建時指定順序。
-可規定索引的排序順序(collation)
create index 索引名 on 表名( a asc , ...);

如果不可避免的出現filesort,大數據排序時，可適當調整參數sort_buffer_size（排序緩存區）大小;

## groupby優化

1. using temporary
   分組操作時，也是要滿足最左前綴法則

## limit優化

一個常見的問題是越往后 排序時間越長 limit 1000000,10
所以可以通過覆蓋索引 + order by 的聯合使用來提高效率

MySQL目前版本不支持在in之後使用Limit語法
select * from __ in (select * from __ order by id limit __)
因此可以把這個看成一張表變成多表查詢
select * from __ a, (select * from __ order by id limit __) b where a.id = b.id;

## count優化

-MyISAM會把總行數存在磁盤上，執行count(*)時可以直接返回該值
-innoDB會一行一行地讀取然後纍積計數，效率低。

count(主鍵)——遍歷整張表取id值，服務器拿到id后，按行纍加，
count(字段)——遍歷整張表取字段值，服務器拿到字段值后，按行纍加，
count(1)———遍歷整張表不取值，每行放一個數字‘1’，按行纍加，
count(*)——遍歷整張表不取值，按行纍加

效率:count(字段) < count(主鍵) < count(1) < count(*)

##update優化
-對有索引的字段進行update只會行鎖那一行，
-對沒有索引的字段進行update就會進行表鎖，
在執行update語句的時候要根據索引來進行更新，否者就會出現從行鎖升級為表鎖。

## 總結

![alt text](image-25.png)

# 視圖

## 介紹

視圖(view)是一種虛擬存在的表，視圖只保存SQL邏輯，不保存數據。
在創建視圖時候，主要工作只落在創建sql的select語句上。

創建
create [or replace] view 視圖名稱[(列表列名)] as select語句 [with [cascaded|local] check option]
->create [or replace] view 視圖名稱 as (select * from __ where __)

查詢
查看創建視圖語句：show create view 視圖名;
查看視圖數據：select * from 視圖名 where...;

修改
方法一：create [or replace] view 視圖名稱[(列表列名)] as select語句 [with [cascaded|local] check option]
方法二：alter view 視圖名[(列表名)] as select語句 [with [cascaded|local] check option]

刪除
drop view [if exists] 視圖名 as select語句;

cascaded /local

- 視圖的檢查選項
  檢查插入/更新時的數據是否符合視圖的條件語句。 
* cascaded
  若視圖2上是基於視圖一的數據創建的，
  那麽在視圖2加上了cascaded后，它會檢查視圖1和視圖2的條件。
  它會遞歸檢查它之内的表數據

* local
  它會往下遞歸去查看其他表，如果表有沒有用到local，那就不會把進行條件的判斷

1.create or replace view stu_v_1 as select id,name from student where id<15;
2.create or replace view stu_v_2 as select id,name from stu_v1 where id>10 with local check option;
會進行id>10的判斷而不會進行id<15的判斷

更新
-視圖的行與表中的行之間必須存在一對一的關係。 
-如果包含以下任何一項則不可更新
聚合函數(sum,min,max,count)
Distinct
Group by
having
union/union all

視圖作用

1. 簡單
   可簡化用戶對數據的操作，將我們常用的查詢定義為視圖，讓用戶可以對其簡單地操作。
2. 安全
   可通過視圖，讓用戶只能查詢和修改他們所能看到的數據。
3. 數據獨立
   可以為用戶屏蔽一些數據表結構變化所帶來的影響

# 存儲過程

 創建
create oprocedure 存儲過程名稱([參數列表])
begin 
        --sql語句
end;

 調用
 call 存儲過程名稱;

查看
select * from information_schema.routines where routine_schema = '數據庫名稱';
show create procedure 存儲過程名稱;

刪除
drop procedure [if exists] 存儲過程名稱;

在命令行當中，執行創建存儲過程的SQL時候，需要通過關鍵字delimiter指定SQl語句的結束符號。
結束的時候要設置回去 'delimiter ;' 

## 變量

### 系統變量

MySQL服務器提供的服務器變量，分爲全局變量(global)，會話變量(session).

查看 
show [global/session] variables;
show [global/session] variables like '...';模糊匹配
show @@[global/session].系統變量名;指定系統變量

設置 [global/session] 系統變量名 = 值;
set @@[global/session] 系統變量名 = 值;

### 用戶定義變量

作用域為當前會話

賦值
set @變量= expr [];
set @變量 := expr[];
select @變量 := expr[];
setect 字段名 into @變量 from 表名;

使用select @變量;

### 局部變量

訪問之前需要declare聲明，可用作存儲過程内的局部變量和輸入參數，
範圍在聲明的begin...end塊。

聲明
declare 變量名 變量類型[default...];

賦值
set 變量名 = 值;
set 變量名 := 值;
select 字段名 into 變量名 from 表名;

## 語法

### if語法

if 條件 then
else if 條件2 then
else 
end if;

### 參數類型

![alt text](image-26.png)

用法
create procedure 存儲過程名稱([in/out/inout 參數名 參數類型])
begin   --SQL語句        end;

### case

case語法一
case  表達式
        when value1 then SQL語句
        when value2 then SQL語句
        else SQL語句
end case;

case語法二
case 
        when 條件表達式1 then SQL語句
        when 條件表達式2 then SQL語句
        else SQL語句
end case;

### while

while 條件 do
        SQL邏輯
end while;

### repeat

--滿足條件退出循環
repeat 
        SQL邏輯
        until 條件
end repeat;

### loop

--可配合兩個語句來使用:
-leave:配合循環使用，退出循環.
-iterate:必須用在循環中，作用是跳過當前循環剩下的語句，直接進入下一次循環

[begin_label:]loop
        SQL邏輯
end loop[end_label];

leave label;（break）
iterate label;（continue）

### 游標

用來存儲查詢結果集的數據類型

聲明游標
declare 游標名稱 cursor for 查詢語句;

打開游標
open 游標名稱;

獲取游標記錄
fetch 游標名稱 into 變量 [,變量];

關閉游標
close 游標名稱;

條件處理程序(Handler)
declare handler_action handler for condition_value [,condition_value] ...statement;

handler_action
        continue：繼續執行行當前程序;
        EXIT：終止執行當前程序
condition_value
        SQLSTATE sqlstate_value：狀態碼，如02000
        SQLWARNING：所有以01開頭的SQLSTATE代碼的簡寫
        NOT FOUND：所有以02開頭的SQLSTATE代碼的簡寫
        SQLECEPTION：所有沒有被SQLWARNING或NOT FOUND 捕獲的SQLSTATE代碼簡寫

# 存儲函數

有返回值的存儲過程，參數只能是IN類型。
create function 存儲函數名稱([參數列表])
returns type [characteristic...]
begin  
        ——SQL語句
        return ...
END;

characteristic説明:
--deterministic：相同的輸入參數總是產生相同的結果
--no sql：不包含SQL語句
--reads sql data：包含讀取數據的語句，但不包含寫入數據的語句

# 觸發器

使用別名OLD和NEW來引用觸發器中發生變化的記錄内容
![alt text](image-27.png)

## 語法

創建
create trigger 觸發器名
before/after insert/update/delete
on 表名 for each row --行級觸發器
begin   trigger_stmt;   end;

查看
show triggers;

刪除
drop trigger [數據庫名]觸發器名;

可以在插入/修改/刪除數據的時候，
把相對應的日志記錄下來插入到日志表中。

# 鎖

## 全局鎖

：鎖定數據庫中的所有表

- 整個實例處於只讀狀態
- 爲了獲取一致性視圖，保證數據的完整性

鎖
flush tables with read lock;

數據備份(在windows上執行)
mysqldump -uroot -p123456 數據庫名 > 被存入的文件名.sql
InnoDB中，可加入--single-transaction來完成不加鎖的一致性數據備份

解鎖
unlock tables;

## 表級鎖

：每次操作鎖住整張表

分類：表鎖，元數據鎖，意向鎖

### 表鎖

- 表共享讀鎖(read lock) ：會阻塞自己和其他客戶端的寫
- 表獨占寫鎖(write lock)：會阻塞其他客戶端的讀與寫

語法

1. 加鎖：lock tables 表名 ... read/write
2. 解鎖：unlock tables/客戶端斷開鏈接

### 元數據鎖（不用手動加）

(meta data lock,MDL)
系統會自動控制，用於維護表結構，爲了避免DML和DDL衝突，保證讀寫的正確性
![alt text](image-28.png)

查看元數據鎖：
![alt text](image-29.png)

### 意向鎖（不用手動加）

1. 意向共享鎖(IS)
   ：由語句select...lock in share mode添加。
   —— 與read兼容，write互斥

2. 意向排他鎖(IX)
   ：由insert,update,delete,select...for ypdate添加。
   —— 與read,write都互斥，意向鎖直接兼容

查詢意向鎖：
![alt text](image-30.png)

## 行級鎖

：每次操作鎖住對應的行數據
-鎖定力度最小，發生鎖衝突的概率最低，并發度最高。

### 行鎖(Record Lock)

InnoDB實現了兩種類型的行鎖：

1. 共享鎖(S)
2. 排他鎖(X)
   ![alt text](image-31.png)
   ![alt text](image-32.png)

![alt text](image-33.png)

### 間隙鎖(Gap Lock)/臨鍵鎖(Next-Key Lock)

間隙鎖：只會鎖著間隙不包含數據（防止別的數據插入間隙）
臨鍵鎖：會鎖著當前的數據記錄和鎖定數據之前的那個間隙

對兩條記錄中加了鎖，黨要往内插入更新數據時就會被阻塞
InnoDB使用next-key鎖進行搜索和索引掃描，以防止幻讀

1. 等值查詢時  唯一索引 給不存在的記錄加鎖時，會優化為間隙鎖
2. 等值查詢時  普通索引 向右遍歷時最後一個值不滿足查詢要求，next-key-lock退化為間隙鎖 
3. 範圍查詢時  唯一索引 會訪問到不滿足條件的第一個值爲止

## 終結

![alt text](image-34.png)

# MySQL常用工具

![alt text](image-35.png)