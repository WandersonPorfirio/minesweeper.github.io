


	class Celula {
		constructor (x, y, w) {
			this.x = x;
			this.y = y;
			this.w = w;

			this.flag    = null;
			this.covered = true;

			this.neighborsList  = [];
			this.neighborsCount = 0;
		};

		selectionArea (x, y) {
			var _el = this;

			return (
				y >= _el.y * _el.w && y <= _el.y * _el.w + _el.w && x >= _el.x * _el.w && x <= _el.x * _el.w + _el.w
			);
		};

		revealIt (matriz) {
			this.covered = false;

			if (this.neighborsCount === 0) {
				this.floodFill(matriz);
			};
		};

		floodFill (matriz) {
			var _el = this;

			for (var i = -1; i <= 1; i++) {
				if (!matriz[_el.y + i]) continue;
				for (var j = -1; j <= 1; j++) {
					var celula = matriz[_el.y + i][_el.x + j];
					if (!celula || !i && !j) continue;
					if (celula.neighborsCount >= 0 && celula.covered) {
						celula.revealIt(matriz);
					};
				};
			};
		};
	};


