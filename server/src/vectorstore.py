import weaviate.classes as wvc

from interface import SearchFilter



def get_filters(filter: SearchFilter):
    filters = []

    if filter.start_date is not None:
        filters.append(wvc.query.Filter.by_property("timestamp_published").greater_than(filter.start_date))
    if filter.end_date  is not None:
        filters.append(wvc.query.Filter.by_property("timestamp_published").less_than(filter.end_date))
    if len(filter.conferences ) > 0:
        filters.append(wvc.query.Filter.by_property("conference").contains_any(filter.conferences))
    if len(filter.categories ) > 0:
        filters.append(wvc.query.Filter.by_property("categories").contains_any(filter.categories))

    # Combine all filters with logical AND if there are any filters, else no filters
    combined_filters = filters[0] if filters else None
    for f in filters[1:]:
        combined_filters = combined_filters & f

    return combined_filters
