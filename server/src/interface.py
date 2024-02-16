from pydantic import BaseModel


class Document(BaseModel):
    title: str
    authors: list[str]
    abstract: str
    text: list[str]
    pdf: str
    year: int
    conference: str
    keywords: list[str]


class Recommendation(BaseModel):
    document: Document
    relevance_description: str


class SearchFilter(BaseModel):
    start_date: str | None
    end_date: str | None
    conferences: list[str]
    categories: list[str]


class SearchMetadata(BaseModel):
    timestamp_published: str = None
    conference: str
    categories: list[str]


class SearchObject(BaseModel):
    text: str
    filter: SearchFilter
    offset: int
