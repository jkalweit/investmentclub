/// <reference path="./typings/tsd.d.ts" />
/// <reference path="./Utils.ts" />
/// <reference path="./SyncNode.ts" />
/// <reference path="./SyncNodeSocket.ts" />

"use strict"


namespace Models {

	export class Db {
		members: {[key: string]: Member}
	}

	export class Member {
		key: string;
		name: string;
	}

}

namespace Views {
	
	export interface PageContent {
		header: string;
		body: string;
		footer: string;
	}
	export class PageInner {
		static render(content: PageContent) {
			return `
				<div data-role="header">${content.header}</div>
				<div role="main" class="ui-content">${content.body}</div>
				<div data-role="footer">${content.footer}</div>
				`;
		}
	}

	export class Members {
		static render(members: Models.Member[]): string {
			return `
				<ul data-role="listview">
					${members.map(member => `<li><a href="#">${member.name}</a></li>`).join('\n')}
				</ul>`;
		}
	}
}



var data: Models.Db = { members: {} };

var sync = new SyncNodeSocket.SyncNodeSocket('data', data);

sync.onUpdated((updated: Models.Db) => {
	console.log('updated data!', updated);
	data = updated;
	
	var page: Views.PageContent = {
		header: `<h4>Members</h4>`,
		body: Views.Members.render(Utils.toArray(data.members)), 
		footer: `<h4>The End</h4>`
	};

	$('#members').html(Views.PageInner.render(page));
	$('#members').trigger('create');
});


