


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

		draw (Sprites, tileSize) {
			let _el = this;

			if (_el.covered) {
				if (_el.flag) {
					return Sprites[_el.flag].toDraw(_el.x * tileSize, _el.y * tileSize, tileSize, tileSize);
				};

				return Sprites.covered.toDraw(_el.x * tileSize, _el.y * tileSize, tileSize, tileSize);
			};

			switch (_el.neighborsCount) {
				case -1:
					if (_el.detonated) {
						return Sprites.detonated.toDraw(_el.x * tileSize, _el.y * tileSize, tileSize, tileSize);
					};

					Sprites.hasBomb.toDraw(_el.x * tileSize, _el.y * tileSize, tileSize, tileSize);
					break;
				case 0:
					if (_el.flag === 'bombFlag') {
						return Sprites.noBomb.toDraw(_el.x * tileSize, _el.y * tileSize, tileSize, tileSize);
					};

					Sprites.emptyCell.toDraw(_el.x * tileSize, _el.y * tileSize, tileSize, tileSize);
					break;
				case 1:
				case 2:
				case 3:
				case 4:
				case 5:
				case 6:
				case 7:
				case 8:
					if (_el.flag === 'bombFlag') {
						return Sprites.noBomb.toDraw(_el.x * tileSize, _el.y * tileSize, tileSize, tileSize);
					};

					Sprites.numbers['number' + _el.neighborsCount].toDraw(_el.x * tileSize, _el.y * tileSize, tileSize, tileSize);
					break;
			};
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


