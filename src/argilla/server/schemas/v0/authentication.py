#  Copyright 2021-present, the Recognai S.L. team.
#
#  Licensed under the Apache License, Version 2.0 (the "License");
#  you may not use this file except in compliance with the License.
#  You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
#  Unless required by applicable law or agreed to in writing, software
#  distributed under the License is distributed on an "AS IS" BASIS,
#  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#  See the License for the specific language governing permissions and
#  limitations under the License.

from typing import Annotated

from fastapi import Form

from argilla.server.pydantic_v1 import BaseModel


class UserPasswordRequestForm:
    """User password request form."""

    def __init__(self, *, username: Annotated[str, Form()], password: Annotated[str, Form()]):
        self.username = username
        self.password = password


class Token(BaseModel):
    """Token response model"""

    access_token: str
    token_type: str = "bearer"
