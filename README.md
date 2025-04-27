##TodoList App

>###App소개
* 이 App은 간단한 Todo일정을 조회, 등록, 수정, 삭제 할수 있습니다. 그리고 Todo 내용과 함께 장소를 지도 API를 통해 위치 정보도 함께 저장할 수 있는 TodoList 애플리케이션입니다.

>###주요 기능
- 달별로 등록된 일정을 확일 할 수 있습니다.
- 등록, 수정, 삭제 기능
- 지동 API 연동을 통한 위치 표시

>###소스 빌드 및 실행 방법 메뉴얼

 CREATE TABLE todos (
    id varchar(35)  NOT NULL,
    tododate  DATE,
    content varchar(300),
    lat varchar(50), 
    slg varchar(50),
    regdate DATE,
PRIMARY KEY (id)   
);

create table sequences(	name varchar(32),	currval bigint unsigned) engine = InnoDB;

create procedure `create_sequence` (In seq_name text)	modifies sql data	deterministicbegin	delete from sequences where name = seq_name;	insert into sequences values(seq_name, 0);end;

create function `nextval` (seq_name varchar(32))	returns bigint unsigned	modifies sql data	deterministicbegin	declare ret bigint unsigned;	update sequences set currval = currval + 1 where name = seq_name;	select currval into ret from sequences where name = seq_name limit 1;	return ret;end;

INSERT INTO todos  VALUES(NEXTVAL(id_seq), '20250401', '카페에서 스터디' , '37.55465000468857', '126.97059787494679', NOW());
INSERT INTO todos  VALUES(NEXTVAL(id_seq), '20250405', '테니스' , '37.55465000468857', '126.97059787494679', NOW());
INSERT INTO todos  VALUES(NEXTVAL(id_seq), '20250420', '친구와 약속' , '37.55465000468857', '126.97059787494679', NOW());



>### 주력으로 사용한 라이브러리
- 1. Route
- 사용이유 : 기존 MAP은 페이지 이동 제공이 쾌적하지 않고 부하가 심한 반면 SPA에서 페이지 이동이 매끄럽고 여러 사용자가 이용가능  하다는 장점과, URL 기반의 컴포넌트 렌더링을 가능하게 해, 라우팅 로직을 깔끔하게 관리할 수 있다는 장점 때문에 사용하였습니다.

- 2.useReducer
- 사용이유 :  로직을 구조적으로 관리할 수 있어 유지보수가 쉽고, 상태 변경 로직을 컴포넌트 외부로 분리해 코드의 가독성과 재사용성이 높아진다는 장점 때문에  사용하였습니다.
