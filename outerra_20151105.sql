--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: outerra; Type: TABLE; Schema: public; Owner: sysadmin; Tablespace: 
--

CREATE TABLE outerra (
    id integer NOT NULL,
    title character varying(255),
    url text,
    x double precision,
    y double precision,
    tilt double precision,
    heading double precision,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);


ALTER TABLE public.outerra OWNER TO sysadmin;

--
-- Name: outerra_id_seq; Type: SEQUENCE; Schema: public; Owner: sysadmin
--

CREATE SEQUENCE outerra_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.outerra_id_seq OWNER TO sysadmin;

--
-- Name: outerra_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sysadmin
--

ALTER SEQUENCE outerra_id_seq OWNED BY outerra.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: sysadmin
--

ALTER TABLE ONLY outerra ALTER COLUMN id SET DEFAULT nextval('outerra_id_seq'::regclass);


--
-- Data for Name: outerra; Type: TABLE DATA; Schema: public; Owner: sysadmin
--

COPY outerra (id, title, url, x, y, tilt, heading, "createdAt", "updatedAt") FROM stdin;
1	Aspen View 1 RCP26	<img src="http://scooby.iplantcollaborative.org/gifs/AspenView_1_RCP26.gif"/>	-106.918384016742294	39.3448630271590574	65.0285350749702076	-176.181997598029994	\N	\N
2	Mt Lemmon RCP26	<img src="http://scooby.iplantcollaborative.org/gifs/mt_lemmon_RCP26.gif"/>	-110.475135041204297	32.6632133151069866	56.3933750942091265	-127.452154372628897	\N	\N
1	Aspen View 1 RCP26	<img src="http://scooby.iplantcollaborative.org/gifs/AspenView_1_RCP26.gif"/>	-106.918384016742294	39.3448630271590574	65.0285350749702076	-176.181997598029994	\N	\N
2	Mt Lemmon RCP26	<img src="http://scooby.iplantcollaborative.org/gifs/mt_lemmon_RCP26.gif"/>	-110.475135041204297	32.6632133151069866	56.3933750942091265	-127.452154372628897	\N	\N
1	Aspen View 1 RCP26	<img src="http://scooby.iplantcollaborative.org/gifs/AspenView_1_RCP26.gif"/>	-106.918384016742294	39.3448630271590574	65.0285350749702076	-176.181997598029994	\N	\N
2	Mt Lemmon RCP26	<img src="http://scooby.iplantcollaborative.org/gifs/mt_lemmon_RCP26.gif"/>	-110.475135041204297	32.6632133151069866	56.3933750942091265	-127.452154372628897	\N	\N
3	Olympic National Park	<iframe class="outerraVideoIframe" src="https://player.vimeo.com/video/141699521" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="height:82%;width:101%;"></iframe> <p><a href="https://vimeo.com/141699521">olympic-high-path</a> from <a href="https://vimeo.com/user39691045">Daniel Guaderrama</a> on <a href="https://vimeo.com">Vimeo</a>.</p>	-123.4982507	47.9690682000000024	65	-176	\N	\N
4	Grand Canyon	<iframe src="https://player.vimeo.com/video/142843044" style="height: 82%; width: 101%;" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> <p><a href="https://vimeo.com/142843044">gc-1</a> from <a href="https://vimeo.com/user39691045">Daniel Guaderrama</a> on <a href="https://vimeo.com">Vimeo</a>.</p>	-112.110805999999997	36.1134449999999987	100	-100	\N	\N
5	Yosemite National Park	<iframe src="https://player.vimeo.com/video/141137183" style="height: 82%; width: 101%;" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> <p><a href="https://vimeo.com/141137183">Yosemite with roads</a> from <a href="https://vimeo.com/user39691045">Daniel Guaderrama</a> on <a href="https://vimeo.com">Vimeo</a>.</p>	-119.540523399999998	37.8651053000000033	100	100	\N	\N
\.


--
-- Name: outerra_id_seq; Type: SEQUENCE SET; Schema: public; Owner: sysadmin
--

SELECT pg_catalog.setval('outerra_id_seq', 5, true);


--
-- Name: outerra; Type: ACL; Schema: public; Owner: sysadmin
--

REVOKE ALL ON TABLE outerra FROM PUBLIC;
REVOKE ALL ON TABLE outerra FROM sysadmin;
GRANT ALL ON TABLE outerra TO sysadmin;
GRANT SELECT ON TABLE outerra TO ffdm;
GRANT ALL ON TABLE outerra TO dguaderr;
GRANT SELECT ON TABLE outerra TO ffdm_read;


--
-- Name: outerra_id_seq; Type: ACL; Schema: public; Owner: sysadmin
--

REVOKE ALL ON SEQUENCE outerra_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE outerra_id_seq FROM sysadmin;
GRANT ALL ON SEQUENCE outerra_id_seq TO sysadmin;
GRANT ALL ON SEQUENCE outerra_id_seq TO dguaderr;


--
-- PostgreSQL database dump complete
--

