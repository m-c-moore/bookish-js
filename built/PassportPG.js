var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
export default class PassportPG {
    constructor() { }
    static generateToken(username, password) {
        const user = { 'username': username,
            'password': password };
        const token = jwt.sign(user, 'our_secret');
        return token;
    }
}
