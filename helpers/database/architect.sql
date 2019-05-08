
CREATE SEQUENCE public.rounds_rounds_id_seq;

CREATE TABLE public.rounds (
                rounds_id INTEGER NOT NULL DEFAULT nextval('public.rounds_rounds_id_seq'),
                rounds_desc VARCHAR NOT NULL,
                CONSTRAINT rounds_pk PRIMARY KEY (rounds_id)
);


ALTER SEQUENCE public.rounds_rounds_id_seq OWNED BY public.rounds.rounds_id;

CREATE SEQUENCE public.groups_group_id_seq;

CREATE TABLE public.groups (
                group_id INTEGER NOT NULL DEFAULT nextval('public.groups_group_id_seq'),
                group_desc VARCHAR NOT NULL,
                CONSTRAINT groups_pk PRIMARY KEY (group_id)
);


ALTER SEQUENCE public.groups_group_id_seq OWNED BY public.groups.group_id;

CREATE SEQUENCE public.type_tournament_type_tournament_id_seq_1;

CREATE TABLE public.type_tournament (
                type_tournament_id INTEGER NOT NULL DEFAULT nextval('public.type_tournament_type_tournament_id_seq_1'),
                tournament_description VARCHAR NOT NULL,
                CONSTRAINT type_tournament_pk PRIMARY KEY (type_tournament_id)
);


ALTER SEQUENCE public.type_tournament_type_tournament_id_seq_1 OWNED BY public.type_tournament.type_tournament_id;

CREATE SEQUENCE public.team_status_team_status_id_seq_1;

CREATE TABLE public.team_status (
                team_status_id INTEGER NOT NULL DEFAULT nextval('public.team_status_team_status_id_seq_1'),
                status_description VARCHAR NOT NULL,
                CONSTRAINT team_status_pk PRIMARY KEY (team_status_id)
);


ALTER SEQUENCE public.team_status_team_status_id_seq_1 OWNED BY public.team_status.team_status_id;

CREATE SEQUENCE public.country_country_id_seq;

CREATE TABLE public.country (
                country_id INTEGER NOT NULL DEFAULT nextval('public.country_country_id_seq'),
                country_name VARCHAR NOT NULL,
                CONSTRAINT country_pk PRIMARY KEY (country_id)
);


ALTER SEQUENCE public.country_country_id_seq OWNED BY public.country.country_id;

CREATE TABLE public.teams (
                teams_id INTEGER NOT NULL,
                country_id INTEGER NOT NULL,
                teams_name VARCHAR NOT NULL,
                teams_url VARCHAR NOT NULL,
                teams_average NUMERIC NOT NULL,
                CONSTRAINT teams_pk PRIMARY KEY (teams_id)
);


CREATE SEQUENCE public.tournaments_tournaments_id_seq;

CREATE TABLE public.tournaments (
                tournaments_id INTEGER NOT NULL DEFAULT nextval('public.tournaments_tournaments_id_seq'),
                type_tournament_id INTEGER NOT NULL,
                country_id INTEGER NOT NULL,
                tournaments_name VARCHAR NOT NULL,
                CONSTRAINT tournaments_pk PRIMARY KEY (tournaments_id)
);


ALTER SEQUENCE public.tournaments_tournaments_id_seq OWNED BY public.tournaments.tournaments_id;

CREATE SEQUENCE public.matches_match_id_seq;

CREATE TABLE public.matches (
                match_id INTEGER NOT NULL DEFAULT nextval('public.matches_match_id_seq'),
                tournaments_id INTEGER NOT NULL,
                CONSTRAINT matches_pk PRIMARY KEY (match_id)
);


ALTER SEQUENCE public.matches_match_id_seq OWNED BY public.matches.match_id;

CREATE SEQUENCE public.matches_teams_matches_teams_id_seq;

CREATE TABLE public.matches_teams (
                matches_teams_id INTEGER NOT NULL DEFAULT nextval('public.matches_teams_matches_teams_id_seq'),
                team_status_id INTEGER NOT NULL,
                teams_id INTEGER NOT NULL,
                match_id INTEGER NOT NULL,
                rounds_id INTEGER NOT NULL,
                group_id INTEGER NOT NULL,
                team_score VARCHAR NOT NULL,
                CONSTRAINT matches_teams_pk PRIMARY KEY (matches_teams_id)
);


ALTER SEQUENCE public.matches_teams_matches_teams_id_seq OWNED BY public.matches_teams.matches_teams_id;

CREATE TABLE public.type_users (
                type_users_id INTEGER NOT NULL,
                type_description VARCHAR NOT NULL,
                CONSTRAINT type_users_pk PRIMARY KEY (type_users_id)
);


CREATE SEQUENCE public.users_users_id_seq;

CREATE TABLE public.users (
                users_id INTEGER NOT NULL DEFAULT nextval('public.users_users_id_seq'),
                type_users_id INTEGER NOT NULL,
                users_username VARCHAR NOT NULL,
                users_password VARCHAR NOT NULL,
                users_email VARCHAR NOT NULL,
                users_name VARCHAR NOT NULL,
                users_creation_time DATE,
                users_credit_card VARCHAR,
                users_bank_account VARCHAR,
                CONSTRAINT users_pk PRIMARY KEY (users_id)
);


ALTER SEQUENCE public.users_users_id_seq OWNED BY public.users.users_id;

CREATE SEQUENCE public.following_follow_id_seq;

CREATE TABLE public.following (
                follow_id INTEGER NOT NULL DEFAULT nextval('public.following_follow_id_seq'),
                teams_id INTEGER NOT NULL,
                users_id INTEGER NOT NULL,
                CONSTRAINT following_pk PRIMARY KEY (follow_id)
);


ALTER SEQUENCE public.following_follow_id_seq OWNED BY public.following.follow_id;

CREATE SEQUENCE public.bet_detail_bet_id_seq;

CREATE TABLE public.bet_detail (
                bet_id INTEGER NOT NULL DEFAULT nextval('public.bet_detail_bet_id_seq'),
                match_id INTEGER NOT NULL,
                users_id INTEGER NOT NULL,
                bet_payment VARCHAR NOT NULL,
                bet_odd NUMERIC NOT NULL,
                team1_score INTEGER NOT NULL,
                team2_score INTEGER NOT NULL,
                CONSTRAINT bet_detail_pk PRIMARY KEY (bet_id)
);


ALTER SEQUENCE public.bet_detail_bet_id_seq OWNED BY public.bet_detail.bet_id;

ALTER TABLE public.matches_teams ADD CONSTRAINT rounds_matches_teams_fk
FOREIGN KEY (rounds_id)
REFERENCES public.rounds (rounds_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.matches_teams ADD CONSTRAINT groups_matches_teams_fk
FOREIGN KEY (group_id)
REFERENCES public.groups (group_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.tournaments ADD CONSTRAINT type_tournament_tournaments_fk
FOREIGN KEY (type_tournament_id)
REFERENCES public.type_tournament (type_tournament_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.matches_teams ADD CONSTRAINT team_status_matches_teams_fk
FOREIGN KEY (team_status_id)
REFERENCES public.team_status (team_status_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.teams ADD CONSTRAINT country_teams_fk
FOREIGN KEY (country_id)
REFERENCES public.country (country_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.tournaments ADD CONSTRAINT country_tournaments_fk
FOREIGN KEY (country_id)
REFERENCES public.country (country_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.following ADD CONSTRAINT teams_following_fk
FOREIGN KEY (teams_id)
REFERENCES public.teams (teams_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.matches_teams ADD CONSTRAINT teams_matches_teams_fk
FOREIGN KEY (teams_id)
REFERENCES public.teams (teams_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.matches ADD CONSTRAINT tournaments_matches_fk
FOREIGN KEY (tournaments_id)
REFERENCES public.tournaments (tournaments_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.bet_detail ADD CONSTRAINT matches_bet_detail_fk
FOREIGN KEY (match_id)
REFERENCES public.matches (match_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.matches_teams ADD CONSTRAINT matches_matches_teams_fk
FOREIGN KEY (match_id)
REFERENCES public.matches (match_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.users ADD CONSTRAINT type_users_users_fk
FOREIGN KEY (type_users_id)
REFERENCES public.type_users (type_users_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.bet_detail ADD CONSTRAINT users_bet_detail_fk
FOREIGN KEY (users_id)
REFERENCES public.users (users_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.following ADD CONSTRAINT users_following_fk
FOREIGN KEY (users_id)
REFERENCES public.users (users_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;
