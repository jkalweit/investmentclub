/// <reference path="./typings/tsd.d.ts" />
/// <reference path="./Utils.ts" />
/// <reference path="./SyncNode.ts" />
/// <reference path="./SyncNodeSocket.ts" />
"use strict";
var Models;
(function (Models) {
    var Db = (function () {
        function Db() {
        }
        return Db;
    })();
    Models.Db = Db;
    var Member = (function () {
        function Member() {
        }
        return Member;
    })();
    Models.Member = Member;
})(Models || (Models = {}));
var Views;
(function (Views) {
    var PageInner = (function () {
        function PageInner() {
        }
        PageInner.render = function (content) {
            return "\n\t\t\t\t<div data-role=\"header\">" + content.header + "</div>\n\t\t\t\t<div role=\"main\" class=\"ui-content\">" + content.body + "</div>\n\t\t\t\t<div data-role=\"footer\">" + content.footer + "</div>\n\t\t\t\t";
        };
        return PageInner;
    })();
    Views.PageInner = PageInner;
    var Members = (function () {
        function Members() {
        }
        Members.render = function (members) {
            return "\n\t\t\t\t<ul data-role=\"listview\">\n\t\t\t\t\t" + members.map(function (member) { return ("<li><a href=\"#\">" + member.name + "</a></li>"); }).join('\n') + "\n\t\t\t\t</ul>";
        };
        return Members;
    })();
    Views.Members = Members;
})(Views || (Views = {}));
var data = { members: {} };
var sync = new SyncNodeSocket.SyncNodeSocket('data', data);
sync.onUpdated(function (updated) {
    console.log('updated data!', updated);
    data = updated;
    var page = {
        header: "<h4>Members</h4>",
        body: Views.Members.render(Utils.toArray(data.members)),
        footer: "<h4>The End</h4>"
    };
    $('#members').html(Views.PageInner.render(page));
    $('#members').trigger('create');
});
//# sourceMappingURL=Views.js.map