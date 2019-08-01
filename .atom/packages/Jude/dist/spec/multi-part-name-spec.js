"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
/// <reference path="../defs/node/node.d.ts" />
/// <reference path="../defs/jasmine/jasmine.d.ts" />
const emptySession_1 = require("./utils/emptySession");
const jasmine13to20_1 = require("../utils/jasmine13to20");
const emptySession_2 = require("./utils/emptySession");
const parseWorkspace_1 = require("../core/parseWorkspace");
const emptySession_3 = require("./utils/emptySession");
const Token_1 = require("../tokens/Token");
describe("multi part names", () => {
    let j13to20 = jasmine13to20_1.jasmine13to20();
    let beforeAll = j13to20.beforeAll;
    let beforeEach = j13to20.beforeEach;
    let it = j13to20.it;
    let afterEach = j13to20.afterEach;
    let afterAll = j13to20.afterAll;
    let sessionModel = emptySession_2.createTestSessionModel();
    let errors = sessionModel.parseSet.errors;
    let path1 = "/file1.jl";
    let contents1 = `type Foo
  val
end

o = Foo(5)
o.val
`;
    let path2 = "/file2.jl";
    let contents2 = `module Mod1
  module Mod2
    function bar()
    
    end
  end
end

Mod1.Mod2.bar()
`;
    let path3 = "/file3.jl";
    let contents3 = `module Mod1
  type Foo
    val
  end
end

function bar(o::Mod1.Foo)
end

o = Mod1.Foo(5)
o.val
`;
    let path4 = "/file4.jl";
    let contents4 = `module Mod1
  type Foo{T}
    val::T
  end
end

function bar{T}(o::Mod1.Foo{T})
end

o = Mod1.Foo{Int}(5)
o.val

o = Mod1.Foo(5)
o.val
`;
    let path5 = "/file5.jl";
    let contents5 = `module Mod1
  module Mod2
    type Foo{T}
      val::T
    end
    o = Foo(5)
  end
end

Mod1.Mod2.o.val
`;
    let path6 = "/file6.jl";
    let contents6 = `module Mod2
  type Foo
    c
    d
  end
  a = 1
  b = 2
  
  o = Foo(3, 4)
  p = Foo(5, 6)
end
w = :o
x = :p
y = :c
z = :d

cond1 = rand() < 0.5
cond2 = rand() < 0.5
Mod2.(cond1 ? w : x).(cond2 ? y : z)
Mod2.(cond1 ? :a : :b)
`;
    beforeAll(() => {
        let o = {};
        o[path1] = contents1;
        o[path2] = contents2;
        o[path3] = contents3;
        o[path4] = contents4;
        o[path5] = contents5;
        o[path6] = contents6;
        emptySession_1.mockAll(o);
    });
    afterAll(() => {
        emptySession_3.unmockAll();
    });
    it("should not be a name error to have property after a name in a multidot", (done) => __awaiter(this, void 0, void 0, function* () {
        yield parseWorkspace_1.parseFullWorkspaceAsync(sessionModel);
        expect(errors[path1].parseErrors.length).toBe(0);
        expect(errors[path1].nameErrors.length).toBe(0);
        done();
    }));
    it("should recognize a function within several module names", (done) => __awaiter(this, void 0, void 0, function* () {
        yield parseWorkspace_1.parseFullWorkspaceAsync(sessionModel);
        expect(errors[path2].parseErrors.length).toBe(0);
        expect(errors[path2].nameErrors.length).toBe(0);
        done();
    }));
    it("should recognize type annotation after module names", (done) => __awaiter(this, void 0, void 0, function* () {
        yield parseWorkspace_1.parseFullWorkspaceAsync(sessionModel);
        expect(errors[path3].parseErrors.length).toBe(0);
        expect(errors[path3].nameErrors.length).toBe(0);
        done();
    }));
    it("should recognize generic type annotation after module names", (done) => __awaiter(this, void 0, void 0, function* () {
        yield parseWorkspace_1.parseFullWorkspaceAsync(sessionModel);
        expect(errors[path4].parseErrors.length).toBe(0);
        expect(errors[path4].nameErrors.length).toBe(0);
        done();
    }));
    it("should not have errors when encountering a property on an object inside a module, " +
        "just because it doesn't know what type the object is", (done) => __awaiter(this, void 0, void 0, function* () {
        yield parseWorkspace_1.parseFullWorkspaceAsync(sessionModel);
        expect(errors[path5].parseErrors.length).toBe(0);
        expect(errors[path5].nameErrors.length).toBe(0);
        let idents = sessionModel.parseSet.identifiers[path5];
        // Mod1.Mod2.o.val
        expect(idents.getIdentifierForPoint(new Token_1.Point(9, 0))).not.toBeNull(); // Mod1
        expect(idents.getIdentifierForPoint(new Token_1.Point(9, 4))).not.toBeNull(); // Mod1 
        expect(idents.getIdentifierForPoint(new Token_1.Point(9, 5))).not.toBeNull(); // Mod2
        expect(idents.getIdentifierForPoint(new Token_1.Point(9, 10))).not.toBeNull(); // o
        expect(idents.getIdentifierForPoint(new Token_1.Point(9, 12))).toBeNull(); // val
        done();
    }));
    it("should not have errors resolving expressions in multi part names", (done) => __awaiter(this, void 0, void 0, function* () {
        yield parseWorkspace_1.parseFullWorkspaceAsync(sessionModel);
        expect(errors[path6].parseErrors.length).toBe(0);
        expect(errors[path6].nameErrors.length).toBe(0);
        let idents = sessionModel.parseSet.identifiers[path6];
        expect(idents.getIdentifierForPoint(new Token_1.Point(18, 24))).not.toBeNull(); // cond2
        expect(idents.getIdentifierForPoint(new Token_1.Point(18, 31))).not.toBeNull(); // y
        expect(idents.getIdentifierForPoint(new Token_1.Point(19, 8))).not.toBeNull(); // cond1
        expect(idents.getIdentifierForPoint(new Token_1.Point(19, 14))).toBeNull(); // :a
        console.log(errors[path6].nameErrors);
        done();
    }));
});
//# sourceMappingURL=multi-part-name-spec.js.map