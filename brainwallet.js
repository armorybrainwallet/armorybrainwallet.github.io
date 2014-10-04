	/* 
      Open source under the BSD License.
      Author: Tim Zakirov, 2014
     */

	function sha256(bits) {
		return CryptoJS.SHA256(bits);
	}
	
	function hash256(bits) {
		return CryptoJS.SHA256(CryptoJS.SHA256(bits));
	}
	
	function computeChecksum(binaryStr, nBytes, hashFunc) {
		nBytes = typeof nBytes !== 'undefined' ? nBytes : 4;
		hashFunc = typeof hashFunc !== 'undefined' ? hashFunc : hash256;
		return hashFunc(binaryStr).toString(CryptoJS.enc.Latin1).slice(0, nBytes);
	}
	
	function binary_to_hex(b) {
		return CryptoJS.enc.Latin1.parse(b).toString();
	}
	
	NORMALCHARS = '0123 4567 89ab cdef'.replace(/ /g, '');
	EASY16CHARS = 'asdf ghjk wert uion'.replace(/ /g, '');
	hex_to_base16_map = {};
	base16_to_hex_map = {};
	len = NORMALCHARS.length;
	for (i = 0; i < len; ++i) {
		n = NORMALCHARS[i];
		b = EASY16CHARS[i];
		hex_to_base16_map[n] = b;
		base16_to_hex_map[b] = n;
	}
	
	function binary_to_easyType16(binstr) {
		return Array.prototype.map.call(binary_to_hex(binstr), function (c) { return hex_to_base16_map[c]; }).join('');
	}
	
	function makeSixteenBytesEasy(b16) {
		if (b16.length !== 16) {
			throw 'Must supply 16-byte input';
		}
		chk2 = computeChecksum(CryptoJS.enc.Latin1.parse(b16), 2);
		et18 = binary_to_easyType16(b16 + chk2);
		nineQuads = [];
		for (i = 0; i < 9; ++i) {
			nineQuads[i] = et18.slice(i * 4, (i+1) * 4);
		}
		return nineQuads.join(' ');
	}
	
	function calc(password) {
		var entropy=hash256(password);			
		var line1=makeSixteenBytesEasy(entropy.toString(CryptoJS.enc.Latin1).slice(0, 16));
		var line2=makeSixteenBytesEasy(entropy.toString(CryptoJS.enc.Latin1).slice(16));
		document.getElementById('line1').innerHTML=line1;
		document.getElementById('line2').innerHTML=line2;
		
	}
	
