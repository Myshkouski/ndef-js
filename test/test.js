var assert = require("assert");
var ndef = require("../lib/ndef");

var textMessageHelloWorld = [ 209, 1, 15, 84, 2, 101, 110, 104, 101, 108, 108, 111,
            44, 32, 119, 111, 114, 108, 100];
var urlMessageNodeJSorg = [ 209, 1, 18, 85, 0, 104, 116, 116, 112, 58, 47, 47,
            110, 111, 100, 101, 106, 115, 46, 111, 114, 103];
var mimeMediaMessage = [ 210, 9, 27, 116, 101, 120, 116, 47, 106, 115, 111, 110,
            123, 34, 109, 101, 115, 115, 97, 103, 101, 34, 58, 32, 34, 104, 101, 108,
            108, 111, 44, 32, 119, 111, 114, 108, 100, 34, 125 ];
var multipleRecordMessage = [ 145, 1, 15, 84, 2, 101, 110, 104, 101, 108, 108, 111,
            44, 32, 119, 111, 114, 108, 100, 17, 1, 18, 85, 0, 104, 116, 116, 112,
            58, 47, 47, 110, 111, 100, 101, 106, 115, 46, 111, 114, 103, 82, 9, 27,
            116, 101, 120, 116, 47, 106, 115, 111, 110, 123, 34, 109, 101, 115, 115, 97,
            103, 101, 34, 58, 32, 34, 104, 101, 108, 108, 111, 44, 32, 119, 111, 114,
            108, 100, 34, 125];
var emptyMessage = [ 208, 0, 0 ];
var threeEmptyMessage =[ 144, 0, 0, 16, 0, 0, 80, 0, 0 ];

describe('Encode Message', function() {
    describe('textRecord', function() {

        it('should match known message', function() {
            var message = [
                ndef.textRecord("hello, world")
            ];

            var encoded = ndef.encodeMessage(message);

            assert.deepEqual(textMessageHelloWorld, encoded);
        })
    })

    describe('uriRecord', function() {
        it('should match known message', function() {
            var message = [
                ndef.uriRecord("http://nodejs.org")
            ];

            var encoded = ndef.encodeMessage(message);

            assert.deepEqual(urlMessageNodeJSorg, encoded);
        })
    })

    describe('mimeMediaRecord', function() {
        it('should match known message', function() {
            var message = [
                ndef.mimeMediaRecord("text/json", '{"message": "hello, world"}')
            ];
            
            var encoded = ndef.encodeMessage(message);
            
            assert.deepEqual(mimeMediaMessage, encoded);
        })
    })
    
    describe('emptyRecord', function() {
        it('should match known message', function() {
            var message = [
                ndef.emptyRecord()
            ];
            
            var encoded = ndef.encodeMessage(message);
            
            assert.deepEqual(emptyMessage, encoded);
        })
    })

    describe('multipleEmptyRecords', function() {
        it('should match known message', function() {
            var message = [
                ndef.emptyRecord(),
                ndef.emptyRecord(),
                ndef.emptyRecord()                
            ];
            
            var encoded = ndef.encodeMessage(message);
            
            assert.deepEqual(threeEmptyMessage, encoded);
        })
    })

    describe('multipleRecords', function() {
        it('should match known message', function() {
            var message = [
                ndef.textRecord("hello, world"),
                ndef.uriRecord("http://nodejs.org"),
                ndef.mimeMediaRecord("text/json", '{"message": "hello, world"}')
            ];
            
            var encoded = ndef.encodeMessage(message);
            
            assert.deepEqual(multipleRecordMessage, encoded);
        })
    })
    
})

describe('Decode Message', function() {
    describe('textRecord', function() {

        it('should match known record', function() {
            
            // TODO decodeMessage should clone not here
            var decodedMessage = ndef.decodeMessage(textMessageHelloWorld.slice(0));            
            assert.equal(1, decodedMessage.length);
            
            var record = ndef.textRecord("hello, world");
            var decodedRecord = decodedMessage[0];
            
            assert.equal(record.tnf, decodedRecord.tnf);            
            assert.deepEqual(record.type, decodedRecord.type);
            assert.deepEqual(record.payload, decodedRecord.payload);
        })
    })
})


