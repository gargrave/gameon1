import json


def load_json_request(request):
    """
    Converts an NG-style JSON request into a python dict. This is merely a utility
    to make handling Angular's default requests a little more transparent.
    :param request: HttpRequest
    :return: A python from the JSON request, or None if the request is invalid
    """
    meta = request.META
    json_type = 'application/json'

    if 'CONTENT_TYPE' in meta and meta['CONTENT_TYPE'].startswith(json_type):
        return json.loads(str(request.body, encoding='utf8'))
    return None
