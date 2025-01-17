/*
 * coding=utf-8
 * Copyright 2021-present, the Recognai S.L. team.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Context } from "@nuxt/types";
import { useRunningEnvironment } from "~/v1/infrastructure/services/useRunningEnvironment";

export default ({ $auth, route, redirect }: Context) => {
  const { isRunningOnHuggingFace } = useRunningEnvironment();

  switch (route.name) {
    case "sign-in":
      if ($auth.loggedIn) return redirect("/");
      if (route.params.omitCTA) return;
      if (isRunningOnHuggingFace()) return redirect("/welcome-hf-sign-in");
      break;
    case "oauth-provider-callback":
      if (!Object.keys(route.query).length) redirect("/");
      break;
    case "welcome-hf-sign-in":
      if (!isRunningOnHuggingFace()) redirect("/");
      break;

    default:
      if (!$auth.loggedIn) {
        let redirectURL = "/sign-in";

        if (route.path !== route.fullPath)
          redirectURL += encodeURIComponent(route.fullPath);

        redirect(redirectURL);
      }
  }
};
