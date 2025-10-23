import { afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import {
  redirect,
  reload,
  replace,
  stringifyOrigin,
  stringifySearchParams,
  unifyHash,
  unifyPathname,
} from "../lib/utils";
import { windowLocationMock } from "./utils";

describe("stringifyOrigin", () => {
  test.each([
    ["http://test:1111", "http://test:1111"],
    [{ protocol: "http", host: "test:1111" }, "http://test:1111"],
    [{ protocol: "http", host: { hostname: "test", port: 1111 } }, "http://test:1111"],
  ])("(%o) -> %s", (input, output) => {
    const result = stringifyOrigin(input);

    expect(result).toBe(output);
  });
});

describe("unifyPathname", () => {
  test.each([
    ["", ""],
    ["test", "/test"],
    ["test/", "/test"],
    ["test/test", "/test/test"],
    ["test/test/", "/test/test"],
    ["/", "/"],
    ["/test", "/test"],
    ["/test/", "/test"],
    ["/test/test", "/test/test"],
    ["/test/test/", "/test/test"],
  ])("(%s) -> %s", (input, output) => {
    const result = unifyPathname(input);

    expect(result).toBe(output);
  });
});

describe("stringifySearchParams", () => {
  test.each([
    ["", ""],
    [new URLSearchParams(), ""],
    [new URLSearchParams({ test: "true" }), "?test=true"],
  ])("(%o) -> %s", (input, output) => {
    const result = stringifySearchParams(input);

    expect(result).toBe(output);
  });
});

describe("unifyHash", () => {
  test.each([
    ["", ""],
    ["#test", "#test"],
    ["test", "#test"],
  ])("(%s) -> %s", (input, output) => {
    const result = unifyHash(input);

    expect(result).toBe(output);
  });
});

describe("replace", () => {
  afterEach(() => {
    window.history.replaceState({}, "", window.location.origin);
    vi.resetAllMocks();
  });

  test.each([
    ["", { pathname: "/", search: "", hash: "" }],
    ["?test=1", { pathname: "/", search: "?test=1", hash: "" }],
    ["#test", { pathname: "/", search: "", hash: "#test" }],
    ["?test=1#test", { pathname: "/", search: "?test=1", hash: "#test" }],
    [new URL("http://localhost:3000"), { pathname: "/", search: "", hash: "" }],
    [new URL("http://localhost:3000?test=1"), { pathname: "/", search: "?test=1", hash: "" }],
    [new URL("http://localhost:3000#test"), { pathname: "/", search: "", hash: "#test" }],
    [new URL("http://localhost:3000?test=1#test"), { pathname: "/", search: "?test=1", hash: "#test" }],
    [{}, { pathname: "/", search: "", hash: "" }],
    [{ search: "?test=1" }, { pathname: "/", search: "?test=1", hash: "" }],
    [{ hash: "#test" }, { pathname: "/", search: "", hash: "#test" }],
    [
      { search: "?test=1", hash: "#test" },
      { pathname: "/", search: "?test=1", hash: "#test" },
    ],
    [{ search: new URLSearchParams() }, { pathname: "/", search: "", hash: "" }],
    [
      { search: new URLSearchParams(), hash: "#test" },
      { pathname: "/", search: "", hash: "#test" },
    ],
    [{ search: new URLSearchParams("?test=1") }, { pathname: "/", search: "?test=1", hash: "" }],
    [
      { search: new URLSearchParams("?test=1"), hash: "#test" },
      { pathname: "/", search: "?test=1", hash: "#test" },
    ],
  ])("(%o) -> void", (input, objectUrl) => {
    const replaceStateMock = vi.spyOn(window.history, "replaceState");
    const dispatchEventMock = vi.spyOn(window, "dispatchEvent");

    replace(input);

    expect(replaceStateMock).toHaveBeenCalledOnce();
    expect(replaceStateMock).toHaveBeenCalledWith(
      objectUrl,
      "",
      `${objectUrl.pathname}${objectUrl.search}${objectUrl.hash}`,
    );

    expect(dispatchEventMock).toHaveBeenCalledOnce();
    expect(dispatchEventMock).toHaveBeenCalledWith(
      new CustomEvent("changeUrl", {
        detail: new URL(`http://localhost:3000${objectUrl.pathname}${objectUrl.search}${objectUrl.hash}`),
      }),
    );
  });
});

describe("redirect", () => {
  beforeAll(() => {
    windowLocationMock({ assign: () => {} });
  });

  test.each([
    ["", undefined, false],
    ["/", "/", true],
    ["/test", "/test", true],
    [new URL("http://localhost:3000"), "http://localhost:3000/", true],
    [new URL("http://localhost:3000/test"), "http://localhost:3000/test", true],
    [{ pathname: "" }, "", false],
    [{ pathname: "/" }, "/", true],
    [{ pathname: "/test" }, "/test", true],
    [{ origin: "http://localhost:3000", pathname: "/" }, "http://localhost:3000/", true],
    [{ origin: { protocol: "http", host: "localhost:3000" }, pathname: "/" }, "http://localhost:3000/", true],
    [
      { origin: { protocol: "http", host: { hostname: "localhost", port: 3000 } }, pathname: "/" },
      "http://localhost:3000/",
      true,
    ],
    [{ pathname: "/", search: "?test=1" }, "/?test=1", true],
    [{ pathname: "/", search: new URLSearchParams("?test=1") }, "/?test=1", true],
    [{ pathname: "/", hash: "#test" }, "/#test", true],
    [{ pathname: "/", search: "?test=1", hash: "#test" }, "/?test=1#test", true],
    [{ pathname: "/", search: new URLSearchParams("?test=1"), hash: "#test" }, "/?test=1#test", true],
  ])("(%o) -> void", (input, stringUrl, called) => {
    const assignMock = vi.spyOn(window.location, "assign");

    redirect(input);

    if (called) {
      expect(assignMock).toHaveBeenCalledOnce();
      expect(assignMock).toHaveBeenCalledWith(stringUrl);
    } else {
      expect(assignMock).not.toHaveBeenCalled();
    }
  });
});

describe("reload", () => {
  beforeAll(() => {
    windowLocationMock({ reload: () => {} });
  });

  test("() -> void", () => {
    const reloadMock = vi.spyOn(window.location, "reload");

    reload();

    expect(reloadMock).toHaveBeenCalledOnce();
  });
});
