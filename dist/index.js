(function () {
    var menu = document.getElementById('sdm');
    var handle = document.getElementById('sdm-handle');
    var panel = document.getElementById('sdm-panel');
    var picked = document.getElementById('picked'); // demo only; optional

    // Size the panel from the visible viewport (CSS height is only the fallback)
    function sizePanel() {
        var vh = window.visualViewport ? window.visualViewport.height : window.innerHeight;
        var handleH = handle.offsetHeight;
        menu.style.setProperty('--sdm-handle-h', handleH + 'px');
        panel.style.height = Math.max(0, vh - handleH) + 'px';
    }
    sizePanel();
    window.addEventListener('resize', sizePanel);
    window.addEventListener('orientationchange', sizePanel);
    if (window.visualViewport) window.visualViewport.addEventListener('resize', sizePanel);
    // ---------- Menu data ----------
    // Each item: { label, href }  or  { label, children: [...], open?: true }
    // Children can nest to any depth.
    var MENU = [
        { label: 'Book A Class', href: 'booking.html' },
        { label: 'Mission', href: 'mission.html' },
        { label: 'Products', href: '#products', children: [
                { label: 'Web apps', href: '#web' },
                { label: 'Mobile', children: [
                        { label: 'iOS', href: '#ios' },
                        { label: 'Android', href: '#android' }
                    ]},
                { label: 'API', href: '#api' }
            ]
        },
        { label: 'Pricing', href: '#pricing' },
        {
            label: 'Support',
            href: '#support',
            children: [
                {
                    label: 'Documentation',
                    href: '#docs'
                },
                {
                    label: 'Contact us',
                    href: '#contact'
                }
            ]
        },
    ];

    function buildMenu(items, ul, path) {
        items.forEach(function (item, i) {
            var id = path + '-' + i;
            var li = document.createElement('li');
            var label = document.createElement('span');
            label.className = 'sdm-label';
            label.textContent = item.label;

            if (item.children && item.children.length) {
                var btn = document.createElement('button');
                btn.type = 'button';
                btn.setAttribute('aria-expanded', String(!!item.open));
                btn.setAttribute('aria-controls', id);
                var tog = document.createElement('span');
                tog.className = 'sdm-toggle';
                tog.setAttribute('aria-hidden', 'true');
                btn.appendChild(tog);

                var head;
                if (item.href) {
                    // Parent is ALSO a link: separate +/- button and a clickable label
                    btn.className = 'sdm-tbtn';
                    btn.setAttribute('aria-label', 'Toggle ' + item.label + ' submenu');
                    var plink = document.createElement('a');
                    plink.className = 'sdm-link';
                    plink.href = item.href;
                    plink.appendChild(label);
                    head = document.createElement('div');
                    head.className = 'sdm-split';
                    head.append(btn, plink);
                } else {
                    // Toggle-only parent: the whole row is the button
                    btn.className = 'sdm-row';
                    btn.appendChild(label);
                    head = btn;
                }

                var sub = document.createElement('div');
                sub.className = 'sdm-sub' + (item.open ? ' sdm-open' : '');
                sub.id = id;
                if (!item.open) sub.setAttribute('inert', '');
                var subUl = document.createElement('ul');
                sub.appendChild(subUl);

                li.append(head, sub);
                buildMenu(item.children, subUl, id);
            } else {
                var a = document.createElement('a');
                a.className = 'sdm-row';
                a.href = item.href || '#';
                var sp = document.createElement('span');
                sp.className = 'sdm-spacer';
                sp.setAttribute('aria-hidden', 'true');
                a.append(sp, label);
                li.appendChild(a);
            }
            ul.appendChild(li);
        });
    }
    buildMenu(MENU, document.getElementById('sdm-root'), 'sdm-sub');

    function setMenu(open) {
        menu.classList.toggle('sdm-open', open);
        handle.setAttribute('aria-expanded', String(open));
        // Keep hidden links out of the tab order while closed
        if (open) panel.removeAttribute('inert'); else panel.setAttribute('inert', '');
        sizePanel();
    }
    setMenu(false);

    handle.addEventListener('click', function () { setMenu(!menu.classList.contains('sdm-open')); });

    // Submenu toggles (works at any nesting depth)
    panel.addEventListener('click', function (e) {
        var btn = e.target.closest('button[aria-controls]');
        if (btn) {
            var sub = document.getElementById(btn.getAttribute('aria-controls'));
            var expand = btn.getAttribute('aria-expanded') !== 'true';
            btn.setAttribute('aria-expanded', String(expand));
            if (sub) {
                sub.classList.toggle('sdm-open', expand);
                sub.toggleAttribute('inert', !expand);
            }
            return;
        }
        var link = e.target.closest('a.sdm-row, a.sdm-link');
        if (link) {
            e.preventDefault();
            if (picked) picked.textContent = link.textContent.trim();
            setMenu(false);
        }
    });

    // ---------- Swipe gestures ----------
    // Swipe down (from the top edge, the handle, or the open panel) opens the menu;
    // swipe up closes it.
    var SWIPE_MIN = 50;   // minimum vertical travel in px
    var EDGE = 40;        // px from the top of the screen that can start an open-swipe
    var sx = 0, sy = 0, tracking = false, canClose = true;

    document.addEventListener('touchstart', function (e) {
        if (e.touches.length !== 1) { tracking = false; return; }
        var t = e.touches[0];
        sx = t.clientX; sy = t.clientY;
        var isOpen = menu.classList.contains('sdm-open');
        tracking = isOpen || menu.contains(e.target) || sy < EDGE;

        // If the panel can still scroll down, an upward swipe inside it should scroll, not close
        var scrollable = panel.scrollHeight > panel.clientHeight + 1;
        var atBottom = panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 1;
        canClose = !(panel.contains(e.target) && scrollable && !atBottom);
    }, { passive: true });

    document.addEventListener('touchend', function (e) {
        if (!tracking) return;
        tracking = false;
        var t = e.changedTouches[0];
        var dy = t.clientY - sy, dx = t.clientX - sx;
        // Must be mostly vertical and long enough
        if (Math.abs(dy) < SWIPE_MIN || Math.abs(dy) < Math.abs(dx) * 1.5) return;

        var isOpen = menu.classList.contains('sdm-open');
        if (dy > 0 && !isOpen) setMenu(true);
        else if (dy < 0 && isOpen && canClose) setMenu(false);
    }, { passive: true });

    // Escape closes; click outside closes
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && menu.classList.contains('sdm-open')) { setMenu(false); handle.focus(); }
    });
    document.addEventListener('click', function (e) {
        if (menu.classList.contains('sdm-open') && !menu.contains(e.target)) setMenu(false);
    });
})();