from agent import parse_tags


def test_parse_tags_finds_all_valid():
    response = "Wildfires are worsening due to drought. [event] [science] [statistic]"
    assert parse_tags(response) == ["event", "science", "statistic"]


def test_parse_tags_ignores_invalid():
    response = "Here is my answer. [weather] [event] [random]"
    assert parse_tags(response) == ["event"]


def test_parse_tags_case_insensitive():
    response = "Policy update. [LAW] [Science]"
    assert parse_tags(response) == ["law", "science"]


def test_parse_tags_empty_response():
    assert parse_tags("No tags here.") == []


def test_parse_tags_all_four():
    response = "Full response. [event] [science] [law] [statistic]"
    assert set(parse_tags(response)) == {"event", "science", "law", "statistic"}
