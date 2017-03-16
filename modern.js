top.document.title = "(" + location.hostname + ") Alt-F " + document.title

/* menus */

function getSubIconFromLabel(parentLbl, mnuLbl) {
	switch(mnuLbl) {
		case 'Host': return 'fa-cubes';
		case 'Time': return 'fa-clock-o';
		case 'Mail': return 'fa-envelope-o';
		case 'Proxy': return 'fa-shield';
		case 'Hosts': return 'fa-globe';
		case 'Users': return 'fa-user-secret';
		case 'Folders': return 'fa-files-o';
		case 'Debian': return 'fa-linux';
	}

	//return getIconFromLabel(parentLbl);
	return 'fa-caret-right';
}

function getIconFromLabel(mnuLbl) {
	/* TODO */
	switch (mnuLbl) {
		case 'Status' : return 'fa-ambulance';
		case 'Shortcuts' : return 'fa-external-link';
		case 'Setup': return 'fa-briefcase';
		case 'Disk': return 'fa-database';
		case 'Services': return 'fa-cogs';
		case 'Packages': return 'fa-tachometer';
		case 'System': return 'fa-desktop';
		case 'Logout': return 'fa-chain-broken';
	}
	
	return 'fa-user'
}

function menuSetup(where, display) {
	
	if (where != "side") {
		return
	}

	top.altf.cols="15%,*"	

	frm = parent.nav.document

	/* start menu */

	
	frm.writeln('<body style="margin:0;" >')
	frm.writeln('<div class="vertical_nav">')
	frm.writeln('<ul id="js-menu" class="menu">')

	frm.writeln('<span class="menu--label" style="background-color: #444; color: white; text-align:center; box-shadow: 0 0 20px 1px black; font-family: serif; font-variant: small-caps; font-size: 18px;	 ">Alt-F Menu</span>')
	
	while (obj = menu.shift()) {		
		if (typeof(obj.url) != "undefined") {
			/* no submenu, i.e., Logout, Status */
			frm.writeln('<li class="menu--item">')
			frm.writeln('<a href="', obj.url, '" target="content" class="menu--link" title="', obj.label, '">')
			frm.writeln('<i class="menu--icon  fa fa-fw ', getIconFromLabel(obj.label) ,'"></i>')
			frm.writeln('<span class="menu--label">', obj.label, '</span>')
			frm.writeln('</a>')
			frm.writeln('</li>')
		} else {
			/* with submenus */
			frm.writeln('<li class="menu--item menu--item__has_sub_menu">')
			frm.writeln('<label class="menu--link" title="', obj.label, '">')
			frm.writeln('<i class="menu--icon  fa fa-fw ', getIconFromLabel(obj.label) ,'"></i>')
			frm.writeln('<span class="menu--label">', obj.label, '</span>')
			frm.writeln('</label>')
			
			/* submenu */
			frm.writeln('<ul class="sub_menu">')
			while (sm = obj.smenu.shift()) {
				if (sm.item == '<hr>') {
					frm.writeln('<hr>')
				} else {
					/* unfold items */
					frm.writeln('<li class="sub_menu--item">')
					frm.writeln('<a href="', sm.url, '" target="content" class="sub_menu--link sub_menu--link__active">')
					frm.writeln('<i class="submenu--icon  fa fa-fw ', getSubIconFromLabel(obj.label,sm.item) ,'"></i>') /* icon */
					frm.writeln(sm.item) /* label */
					frm.writeln('</a>')
					frm.writeln('</li>')
				}
			}
			frm.writeln('</ul>')
			
			frm.writeln('</li>')
		}
		
	}

	/* end of menu */
	frm.writeln('</ul>')
	frm.writeln('</div>')

	frm.writeln('<script src="/scripts/modern/vertical-responsive-menu.js"></script>')

	frm.writeln('</body>')
}

/* tooltips */

var stat_id, stat_ev

function popDown(id) {
	if (stat_id)
		clearTimeout(stat_id)
	stat_id = null
	document.getElementById(id).style.visibility = "hidden"
}

function popUp(ev, id) {
	if (stat_id)
		clearTimeout(stat_id)
	stat_ev = ev
	stat_id = id
	setTimeout("iPopUp()", 1000)
}

function iPopUp() {
	if (! stat_id)
		return

	obj = document.getElementById(stat_id)
	stat_id = null

	objWidth = obj.offsetWidth
	objHeight = obj.offsetHeight

	y = stat_ev.pageY + 20
	x = stat_ev.pageX - objWidth/4

	if (x + objWidth > window.innerWidth)
		x -= objWidth/2
	else if (x < 2)
		x = 2

	if (y + objHeight > window.innerHeight)
		y -= 2*objHeight

	obj.style.left = x + 'px'
	obj.style.top = y + 'px'
	obj.style.visibility = "visible"
}

/* bookmarks */

function commonbookmark() {
	try {
		x = parent.content.document.embedf
		title = x.ifname.value
		url = x.ifsrc.value
	} catch(err) {
		title = parent.content.document.title
		url = parent.content.document.location.pathname
	}
	return title + "&url=" + encodeURIComponent(url)
}

function addbookmark() {
	parent.content.document.location.assign("/cgi-bin/bookmark.cgi?add=" + commonbookmark())
	return false
}

function rmbookmark() {
	parent.content.document.location.assign("/cgi-bin/bookmark.cgi?rm=" + commonbookmark())
	return false
}

function rmall() {
	try {
		url = parent.content.document.embedf.ifsrc.value
	} catch(err) {
		url = parent.content.document.location.pathname
	}
	parent.content.document.location.assign("/cgi-bin/bookmark.cgi?rm=all&url=" + url)
	return false
}
