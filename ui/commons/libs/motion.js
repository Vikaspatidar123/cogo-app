/* eslint-disable */ 

!(function (t) { const n = {}; function i(e) { if (n[e]) return n[e].exports; const o = n[e] = { i: e, l: !1, exports: {} }; return t[e].call(o.exports, o, o.exports, i), o.l = !0, o.exports; }i.m = t, i.c = n, i.d = function (t, n, e) { i.o(t, n) || Object.defineProperty(t, n, { enumerable: !0, get: e }); }, i.r = function (t) { typeof Symbol !== 'undefined' && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }), Object.defineProperty(t, '__esModule', { value: !0 }); }, i.t = function (t, n) { if (1 & n && (t = i(t)), 8 & n) return t; if (4 & n && typeof t === 'object' && t && t.__esModule) return t; const e = Object.create(null); if (i.r(e), Object.defineProperty(e, 'default', { enumerable: !0, value: t }), 2 & n && typeof t !== 'string') for (const o in t)i.d(e, o, ((n) => t[n]).bind(null, o)); return e; }, i.n = function (t) { const n = t && t.__esModule ? function () { return t.default; } : function () { return t; }; return i.d(n, 'a', n), n; }, i.o = function (t, n) { return Object.prototype.hasOwnProperty.call(t, n); }, i.p = '', i(i.s = 0); }([function (t, n, i) { i(1), i(2), i(3), i(4), i(5), i(6), t.exports = i(7); }, function (t, n) {
	L.Motion = L.Motion || {
		Event: {
			Started: 'motion-started', Paused: 'motion-paused', Resumed: 'motion-resumed', Section: 'motion-section', Ended: 'motion-ended',
		},
	}, L.motion = L.motion || {}, L.Motion.Animate = {
		options       : { pane: 'polymotionPane', attribution: '' },
		motionOptions : {
			auto: !1, easing(t) { return t; }, speed: 0, duration: 0,
		},
		markerOptions: void 0,
		initialize(t, n, i, e) { L.Util.setOptions(this, n), i && (this.motionOptions = L.Util.extend({}, this.motionOptions, i)), e && (this.markerOptions = L.Util.extend({}, e)), this._bounds = L.latLngBounds(), this._linePoints = this._convertLatLngs(t), L.Motion.Utils.isFlat(this._linePoints) || (this._linePoints = this._linePoints[0]), this._initializeMarker(), this._latlngs = [], L.Util.stamp(this); },
		addLatLng(t, n) { return t = L.Motion.Utils.toLatLng(t), this._linePoints.push(t), this._latlngs.length && this._latlngs.push(t), this; },
		beforeAdd(t) { t.getPane(this.options.pane) || (t.createPane(this.options.pane).style.zIndex = 599), this._renderer = t.getRenderer(this); },
		onAdd(t) { return this._renderer._initPath(this), this._reset(), this._renderer._addPath(this), this.__marker && this.markerOptions.showMarker && (this.__marker.addTo(t), this.__marker._icon && this.__marker._icon.children.length && Array.from(this.__marker._icon.children).forEach(((t) => { const n = t.getAttribute('motion-base'); n && (t.style.transform = `rotate(${n}deg)`); }))), this.motionOptions.auto && this.motionStart(), this; },
		onRemove(t) { this.motionStop(), this.__marker && t.removeLayer(this.__marker), this._renderer._removePath(this); },
		_motion(t) { const n = (new Date()).getTime() - t; let i = 1; if (this.motionOptions.duration && (i = n / this.motionOptions.duration), i < 1) { i = this.motionOptions.easing(i, n, 0, 1, this.motionOptions.duration); const e = L.Motion.Utils.interpolateOnLine(this._map, this._linePoints, i); this.setLatLngs(e.traveledPath), this._drawMarker(e.latLng), this.__ellapsedTime = n, this.animation = L.Util.requestAnimFrame((function () { this._motion(t); }), this); } else this.motionStop(!0); },
		_drawMarker(t) { const n = this.getMarker(); if (n) { const i = n.getLatLng(); const e = this._linePoints[0]; i.lat === e.lat && i.lng === e.lng ? (n.addTo(this._map), n.addEventParent(this)) : n._icon && n._icon.children.length && Array.from(n._icon.children).forEach(((n) => { const e = n.getAttribute('motion-base'); if (e) { let o = 0; e && !isNaN(+e) && (o = +e), n.style.transform = `rotate(-${Math.round(L.Motion.Utils.getAngle(i, t) + o)}deg)`; } })), n.setLatLng(t); } },
		_removeMarker(t) { this.markerOptions && this.__marker && (t && !this.markerOptions.removeOnEnd || this._map.removeLayer(this.__marker)); },
		_initializeMarker() { this.markerOptions && (this.__marker = L.marker(this._linePoints[0], this.markerOptions)); },
		motionStart() { return this._map && !this.animation && (this.motionOptions.duration || (this.motionOptions.speed ? this.motionOptions.duration = L.Motion.Utils.getDuration(this._map, this._linePoints, this.motionOptions.speed) : this.motionOptions.duration = 0), this.setLatLngs([]), this._motion((new Date()).getTime()), this.fire(L.Motion.Event.Started, { layer: this }, !1)), this; },
		motionStop(t) { return this.motionPause(), this.setLatLngs(this._linePoints), this.__ellapsedTime = null, this._removeMarker(t), this.fire(L.Motion.Event.Ended, { layer: this }, !1), this; },
		motionPause() { return this.animation && (L.Util.cancelAnimFrame(this.animation), this.animation = null, this.fire(L.Motion.Event.Paused, { layer: this }, !1)), this; },
		motionResume() { return !this.animation && this.__ellapsedTime && (this.motionOptions.duration || (this.motionOptions.speed ? this.motionOptions.duration = L.Motion.Utils.getDuration(this._map, this._linePoints, this.motionOptions.speed) : this.motionOptions.duration = 0), this._motion((new Date()).getTime() - this.__ellapsedTime), this.fire(L.Motion.Event.Resumed, { layer: this }, !1)), this; },
		motionToggle() { return this.animation ? this.__ellapsedTime && this.motionPause() : this.__ellapsedTime ? this.motionResume() : this.motionStart(), this; },
		motionDuration(t) { const n = this.motionSpeed.duration; return this.motionOptions.duration = t || 0, this.animation && n && (this.motionPause(), this.__ellapsedTime *= (n / t), this.motionOptions.duration = t, this.motionResume()), this; },
		motionSpeed(t) { const n = this.motionOptions.speed; return this.motionOptions.speed = t || 0, this.animation && n && (this.motionPause(), this.__ellapsedTime *= (n / t), this.motionOptions.duration = L.Motion.Utils.getDuration(this._map, this._linePoints, this.motionOptions.speed), this.motionResume()), this; },
		getMarker() { return this.__marker; },
		getMarkers() { return [this.getMarker()]; },
	};
}, function (t, n) {
	L.Motion.Utils = {
		attachDistances(t, n) { if (n.length > 1) for (let i = 1; i < n.length; i++)n[i - 1].distanceToNextPoint = t.distance(n[i - 1], n[i]); return n; }, interpolateOnLine(t, n, i) { if ((n = n instanceof L.Polyline ? n.getLatLngs() : n).length < 2) return null; for (var e = !0, o = 0; o < n.length - 1; o++) if (!n[o].distanceToNextPoint) { e = !1; break; } if (e || this.attachDistances(t, n), (i = Math.max(Math.min(i, 1), 0)) === 0) { const r = n[0] instanceof L.LatLng ? n[0] : L.latLng(n[0]); return { traveledPath: [r], latLng: r }; } if (i == 1) return { traveledPath: n, latLng: n[n.length - 1] instanceof L.LatLng ? n[n.length - 1] : L.latLng(n[n.length - 1]) }; for (var a = 0, s = 0; s < n.length - 1; s++)a += n[s].distanceToNextPoint; for (var u = a * i, h = 0, l = 0, c = 0; l < u; c++) { var m = n[c]; var f = n[c + 1]; h = l, l += m.distanceToNextPoint; } if (m == null && f == null)m = n[0], f = n[1], c = 1; const d = l - h != 0 ? (u - h) / (l - h) : 0; const _ = this.interpolateOnLatLngSegment(m, f, d); const p = n.slice(0, c); return p.push(_), { traveledPath: p, latLng: _ }; }, interpolateOnPointSegment(t, n, i) { return L.point(t.x * (1 - i) + i * n.x, t.y * (1 - i) + i * n.y); }, interpolateOnLatLngSegment(t, n, i) { return L.latLng(t.lat * (1 - i) + i * n.lat, t.lng * (1 - i) + i * n.lng); }, distance(t, n) { for (var i = 0, e = 1; e < n.length; e++)i += t.distance(n[e], n[e - 1]); return i; }, getDuration(t, n, i) { return L.Motion.Utils.distance(t, n.map(((t) => L.Motion.Utils.toLatLng(t)))) / (i / 3600); }, toLatLng(t, n, i) { return t instanceof L.LatLng ? t : L.Util.isArray(t) && typeof t[0] !== 'object' ? t.length === 3 ? L.latLng(t[0], t[1], t[2]) : t.length === 2 ? L.latLng(t[0], t[1]) : null : t == null ? t : typeof t === 'object' && 'lat' in t ? L.latLng(t.lat, 'lng' in t ? t.lng : t.lon, t.alt) : void 0 === n ? null : L.latLng(t, n, i); }, getAngle(t, n) { let i = 180 * Math.atan2(n.lat - t.lat, n.lng - t.lng) / Math.PI; return i < 0 && (i += 360), i; }, isFlat(t) { return !L.Util.isArray(t[0]) || typeof t[0][0] !== 'object' && void 0 !== t[0][0]; },
	};
}, function (t, n) {
	L.Motion.Ease = {
		linear(t) { return t; }, swing(t) { return 0.5 - Math.cos(t * Math.PI) / 2; }, easeInQuad(t, n, i, e, o) { return e * (n /= o) * n + i; }, easeOutQuad(t, n, i, e, o) { return -e * (n /= o) * (n - 2) + i; }, easeInOutQuad(t, n, i, e, o) { return (n /= o / 2) < 1 ? e / 2 * n * n + i : -e / 2 * (--n * (n - 2) - 1) + i; }, easeInCubic(t, n, i, e, o) { return e * (n /= o) * n * n + i; }, easeOutCubic(t, n, i, e, o) { return e * ((n = n / o - 1) * n * n + 1) + i; }, easeInOutCubic(t, n, i, e, o) { return (n /= o / 2) < 1 ? e / 2 * n * n * n + i : e / 2 * ((n -= 2) * n * n + 2) + i; }, easeInQuart(t, n, i, e, o) { return e * (n /= o) * n * n * n + i; }, easeOutQuart(t, n, i, e, o) { return -e * ((n = n / o - 1) * n * n * n - 1) + i; }, easeInOutQuart(t, n, i, e, o) { return (n /= o / 2) < 1 ? e / 2 * n * n * n * n + i : -e / 2 * ((n -= 2) * n * n * n - 2) + i; }, easeInQuint(t, n, i, e, o) { return e * (n /= o) * n * n * n * n + i; }, easeOutQuint(t, n, i, e, o) { return e * ((n = n / o - 1) * n * n * n * n + 1) + i; }, easeInOutQuint(t, n, i, e, o) { return (n /= o / 2) < 1 ? e / 2 * n * n * n * n * n + i : e / 2 * ((n -= 2) * n * n * n * n + 2) + i; }, easeInSine(t, n, i, e, o) { return -e * Math.cos(n / o * (Math.PI / 2)) + e + i; }, easeOutSine(t, n, i, e, o) { return e * Math.sin(n / o * (Math.PI / 2)) + i; }, easeInOutSine(t, n, i, e, o) { return -e / 2 * (Math.cos(Math.PI * n / o) - 1) + i; }, easeInExpo(t, n, i, e, o) { return n == 0 ? i : e * 2 ** (10 * (n / o - 1)) + i; }, easeOutExpo(t, n, i, e, o) { return n == o ? i + e : e * (1 - 2 ** (-10 * n / o)) + i; }, easeInOutExpo(t, n, i, e, o) { return n == 0 ? i : n == o ? i + e : (n /= o / 2) < 1 ? e / 2 * 2 ** (10 * (n - 1)) + i : e / 2 * (2 - 2 ** (-10 * --n)) + i; }, easeInCirc(t, n, i, e, o) { return -e * (Math.sqrt(1 - (n /= o) * n) - 1) + i; }, easeOutCirc(t, n, i, e, o) { return e * Math.sqrt(1 - (n = n / o - 1) * n) + i; }, easeInOutCirc(t, n, i, e, o) { return (n /= o / 2) < 1 ? -e / 2 * (Math.sqrt(1 - n * n) - 1) + i : e / 2 * (Math.sqrt(1 - (n -= 2) * n) + 1) + i; }, easeInElastic(t, n, i, e, o) { let r = 1.70158; let a = 0; let s = e; if (n == 0) return i; if ((n /= o) == 1) return i + e; if (a || (a = 0.3 * o), s < Math.abs(e)) { s = e; r = a / 4; } else r = a / (2 * Math.PI) * Math.asin(e / s); return -s * 2 ** (10 * (n -= 1)) * Math.sin((n * o - r) * (2 * Math.PI) / a) + i; }, easeOutElastic(t, n, i, e, o) { let r = 1.70158; let a = 0; let s = e; if (n == 0) return i; if ((n /= o) == 1) return i + e; if (a || (a = 0.3 * o), s < Math.abs(e)) { s = e; r = a / 4; } else r = a / (2 * Math.PI) * Math.asin(e / s); return s * 2 ** (-10 * n) * Math.sin((n * o - r) * (2 * Math.PI) / a) + e + i; }, easeInOutElastic(t, n, i, e, o) { let r = 1.70158; let a = 0; let s = e; if (n == 0) return i; if ((n /= o / 2) == 2) return i + e; if (a || (a = o * (0.3 * 1.5)), s < Math.abs(e)) { s = e; r = a / 4; } else r = a / (2 * Math.PI) * Math.asin(e / s); return n < 1 ? s * 2 ** (10 * (n -= 1)) * Math.sin((n * o - r) * (2 * Math.PI) / a) * -0.5 + i : s * 2 ** (-10 * (n -= 1)) * Math.sin((n * o - r) * (2 * Math.PI) / a) * 0.5 + e + i; }, easeInBack(t, n, i, e, o, r) { return r == null && (r = 1.70158), e * (n /= o) * n * ((r + 1) * n - r) + i; }, easeOutBack(t, n, i, e, o, r) { return r == null && (r = 1.70158), e * ((n = n / o - 1) * n * ((r + 1) * n + r) + 1) + i; }, easeInOutBack(t, n, i, e, o, r) { return r == null && (r = 1.70158), (n /= o / 2) < 1 ? e / 2 * (n * n * ((1 + (r *= 1.525)) * n - r)) + i : e / 2 * ((n -= 2) * n * ((1 + (r *= 1.525)) * n + r) + 2) + i; }, easeInBounce(t, n, i, e, o) { return e - L.Motion.Ease.easeOutBounce(t, o - n, 0, e, o) + i; }, easeOutBounce(t, n, i, e, o) { return (n /= o) < 1 / 2.75 ? e * (7.5625 * n * n) + i : n < 2 / 2.75 ? e * (7.5625 * (n -= 1.5 / 2.75) * n + 0.75) + i : n < 2.5 / 2.75 ? e * (7.5625 * (n -= 2.25 / 2.75) * n + 0.9375) + i : e * (7.5625 * (n -= 2.625 / 2.75) * n + 0.984375) + i; }, easeInOutBounce(t, n, i, e, o) { return n < o / 2 ? 0.5 * L.Motion.Ease.easeInBounce(t, 2 * n, 0, e, o) + i : 0.5 * L.Motion.Ease.easeOutBounce(t, 2 * n - o, 0, e, o) + 0.5 * e + i; },
	};
}, function (t, n) { L.Motion.Polyline = L.Polyline.extend(L.Motion.Animate), L.motion.polyline = function (t, n, i, e) { return new L.Motion.Polyline(t, n, i, e); }; }, function (t, n) { L.Motion.Polygon = L.Polygon.extend(L.Motion.Animate), L.motion.polygon = function (t, n, i, e) { return new L.Motion.Polygon(t, n, i, e); }; }, function (t, n) {
	L.Motion.Group = L.FeatureGroup.extend({
		_started: !1, _completed: !1, options: { pane: L.Motion.Animate.options.pane, attribution: L.Motion.Animate.options.attribution }, motionStart() { return this.invoke('motionStart'), this._started = !0, this._completed = !1, this.fire(L.Motion.Event.Started, { layer: this }, !1), this; }, motionStop() { return this.invoke('motionStop'), this._completed = !0, this.fire(L.Motion.Event.Ended, { layer: this }, !1), this; }, motionPause() { return this.invoke('motionPause'), this.fire(L.Motion.Event.Paused, { layer: this }, !1), this; }, motionResume() { return this.invoke('motionResume'), this.fire(L.Motion.Event.Resumed, { layer: this }, !1), this; }, motionToggle() { return this.invoke('motionToggle'), this; }, getMarkers() { return this.getLayers().map(((t) => t.getMarkers())); },
	}), L.motion.group = function (t, n) { return new L.Motion.Group(t, n); };
}, function (t, n) {
	L.Motion.Seq = L.Motion.Group.extend({
		_activeLayer: null, _started: !1, _completed: !1, addLayer(t, n) { void 0 === n && (n = !0), this.__prepareLayer(t), L.Motion.Group.prototype.addLayer.call(this, t), !this._activeLayer && n && this._completed && t.motionStart(); }, motionStart() { if (!this._activeLayer) { const t = this.getFirstLayer(); t && (t.motionStart(), this._started = !0, this._completed = !1, this.fire(L.Motion.Event.Started, { layer: this }, !1)); } return this; }, motionStop(t) { return t || this.invoke('motionStop'), this._activeLayer = null, this._completed = !0, this.fire(L.Motion.Event.Ended, { layer: this }, !1), this; }, motionPause() { return this._activeLayer && (this._activeLayer.motionPause(), this.fire(L.Motion.Event.Paused, { layer: this }, !1)), this; }, motionResume() { return this._activeLayer && (this._activeLayer.motionResume(), this.fire(L.Motion.Event.Resumed, { layer: this }, !1)), this; }, motionToggle() { return this._activeLayer ? this.motionPause() : this.motionResume(), this; }, getFirstLayer() { const t = this.getLayers(); return t.length ? t[0] : null; }, __prepareLayer(t) { t.setLatLngs && t.setLatLngs([]), t.off(L.Motion.Event.Ended, this.__clearActiveLayer__, this), t.on(L.Motion.Event.Ended, this.__clearActiveLayer__, this), t.off(L.Motion.Event.Started, this.__putActiveLayer__, this), t.on(L.Motion.Event.Started, this.__putActiveLayer__, this); }, __clearActiveLayer__(t) { this._activeLayer = null; const n = this.getLayers(); const i = t.layer._leaflet_id; const e = n.filter(((t) => t._leaflet_id == i))[0]; const o = n.indexOf(e) + 1; n.length > o ? n[o].motionStart() : this.motionStop(!0); }, __putActiveLayer__(t) { this._activeLayer = t.layer, this.fire(L.Motion.Event.Section, { layer: this._activeLayer }, !1); },
	}), L.motion.seq = function (t, n) { return new L.Motion.Seq(t, n); };
}]));
