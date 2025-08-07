--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: dailysold_tb; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dailysold_tb (
    item_id integer NOT NULL,
    menu_id integer,
    quantity integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.dailysold_tb OWNER TO postgres;

--
-- Name: dailysold_tb_item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dailysold_tb_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.dailysold_tb_item_id_seq OWNER TO postgres;

--
-- Name: dailysold_tb_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dailysold_tb_item_id_seq OWNED BY public.dailysold_tb.item_id;


--
-- Name: menu_tb; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.menu_tb (
    menu_id integer NOT NULL,
    menu_name character varying(100),
    menu_price integer,
    menu_category character varying(50) DEFAULT 'Menu Baru'::character varying,
    menu_url text
);


ALTER TABLE public.menu_tb OWNER TO postgres;

--
-- Name: menu_tb_menu_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.menu_tb_menu_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.menu_tb_menu_id_seq OWNER TO postgres;

--
-- Name: menu_tb_menu_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.menu_tb_menu_id_seq OWNED BY public.menu_tb.menu_id;


--
-- Name: order_tb; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_tb (
    order_id integer NOT NULL,
    tablenum integer,
    personname character varying(100),
    ispaid boolean DEFAULT false,
    totalamount integer DEFAULT 0,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.order_tb OWNER TO postgres;

--
-- Name: order_tb_order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_tb_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_tb_order_id_seq OWNER TO postgres;

--
-- Name: order_tb_order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_tb_order_id_seq OWNED BY public.order_tb.order_id;


--
-- Name: orderdetails_tb; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orderdetails_tb (
    order_id integer,
    menu_id integer,
    quantity integer DEFAULT 0,
    price integer DEFAULT 0,
    order_type character varying(20)
);


ALTER TABLE public.orderdetails_tb OWNER TO postgres;

--
-- Name: dailysold_tb item_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dailysold_tb ALTER COLUMN item_id SET DEFAULT nextval('public.dailysold_tb_item_id_seq'::regclass);


--
-- Name: menu_tb menu_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu_tb ALTER COLUMN menu_id SET DEFAULT nextval('public.menu_tb_menu_id_seq'::regclass);


--
-- Name: order_tb order_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_tb ALTER COLUMN order_id SET DEFAULT nextval('public.order_tb_order_id_seq'::regclass);


--
-- Data for Name: dailysold_tb; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dailysold_tb (item_id, menu_id, quantity) FROM stdin;
9	1	3
10	5	1
8	3	3
11	14	1
6	6	11
12	17	1
7	4	8
\.


--
-- Data for Name: menu_tb; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.menu_tb (menu_id, menu_name, menu_price, menu_category, menu_url) FROM stdin;
1	Pempek Kapal Selam	22000	Pempek	/public/uploads/pempek-kapal-selam.png
2	Pempek Komplit	22000	Pempek	/public/uploads/pempek-komplit.png
3	Roti Bakar Cokelat Keju	24000	Roti	/public/uploads/roti-bakar-cokelat-keju.png
5	Kentang Goreng	17000	Gorengan	/public/uploads/kentang-goreng.png
6	Siomay	16000	Menu Baru	/public/uploads/siomay.png
7	Pempek Lenggang	22000	Pempek	/public/uploads/pempek-lenggang.png
8	Tekwan	22000	Pempek	/public/uploads/tekwan.png
9	Pisang Goreng Original	22000	Pisang Goreng	/public/uploads/pisang-goreng-original.png
10	Pisang Goreng Keju	22000	Pisang Goreng	/public/uploads/pisang-goreng-keju.png
11	Pisang Goreng Tiramisu	22000	Pisang Goreng	/public/uploads/pisang-goreng-tiramisu.png
12	Pisang Goreng Coklat Keju	24000	Pisang Goreng	/public/uploads/pisang-goreng-coklat-keju.png
13	Pisang Goreng Coklat Tiramisu	24000	Pisang Goreng	/public/uploads/pisang-goreng-coklat-tiramisu.png
14	Sistagor	25000	Menu Baru	/public/uploads/sistagor.png
15	Kentang Pangsit Mini	25000	Gorengan	/public/uploads/kentang-goreng-pangsit-mini.png
16	Kentang Goreng Saos Keju	20000	Gorengan	/public/uploads/kentang-goreng-saos-keju.png
17	Chicken Wings	30000	Menu Baru	/public/uploads/chicken-wings.png
18	Roti Bakar Coklat Lumer	18000	Roti	/public/uploads/roti-bakar-coklat-lumer.png
4	Hihang Hoheng Coklat Lumer	22000	Menu Baru	/public/uploads/pisang-goreng-coklat-lumer.png
\.


--
-- Data for Name: order_tb; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_tb (order_id, tablenum, personname, ispaid, totalamount, created_at) FROM stdin;
\.


--
-- Data for Name: orderdetails_tb; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orderdetails_tb (order_id, menu_id, quantity, price, order_type) FROM stdin;
\.


--
-- Name: dailysold_tb_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dailysold_tb_item_id_seq', 12, true);


--
-- Name: menu_tb_menu_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.menu_tb_menu_id_seq', 18, true);


--
-- Name: order_tb_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_tb_order_id_seq', 13, true);


--
-- Name: dailysold_tb dailysold_tb_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dailysold_tb
    ADD CONSTRAINT dailysold_tb_pkey PRIMARY KEY (item_id);


--
-- Name: menu_tb menu_tb_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu_tb
    ADD CONSTRAINT menu_tb_pkey PRIMARY KEY (menu_id);


--
-- Name: order_tb order_tb_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_tb
    ADD CONSTRAINT order_tb_pkey PRIMARY KEY (order_id);


--
-- Name: dailysold_tb dailysold_tb_menu_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dailysold_tb
    ADD CONSTRAINT dailysold_tb_menu_id_fkey FOREIGN KEY (menu_id) REFERENCES public.menu_tb(menu_id);


--
-- Name: orderdetails_tb orderdetails_tb_menu_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orderdetails_tb
    ADD CONSTRAINT orderdetails_tb_menu_id_fkey FOREIGN KEY (menu_id) REFERENCES public.menu_tb(menu_id);


--
-- Name: orderdetails_tb orderdetails_tb_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orderdetails_tb
    ADD CONSTRAINT orderdetails_tb_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.order_tb(order_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

