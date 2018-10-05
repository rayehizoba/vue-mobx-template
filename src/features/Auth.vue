<template>
  <div>
    <h5 class="sticky-header" >Auth Stores</h5>

    <vue-json-pretty
      :data="JSON.parse(stringify(loginForm))"
      showLength
      :deep="0"
    />

    <div class="form">
      <h5>Login form</h5>
      <input
        type="text"
        name="email"
        placeholder="email"
        :value="loginForm.email"
        @keyup="(evt) => {loginForm.set(evt.target.name, evt.target.value)}"
      />
      <small>{{loginForm.validateErrorEmail}}</small>
      <br>

      <input
        type="password"
        name="password"
        placeholder="password"
        :value="loginForm.password"
        @keyup="(evt) => {loginForm.set(evt.target.name, evt.target.value)}"
      />
      <small>{{loginForm.validateErrorPassword}}</small>
      <br>
      <button @click="loginForm.submit()" >Login</button>
    </div>

    <br>
    <br>
    <br>

    <vue-json-pretty
      :data="JSON.parse(stringify(profileUpdateForm))"
      showLength
      :deep="0"
    />

    <div class="form">
      <h5>Profile update form</h5>
      <input
        type="file"
        name="avatar"
        accept="images/*"
        @change="(evt) => {profileUpdateForm.set(evt.target.name, evt.target.files[0])}"
      >
      <input
        type="text"
        name="userId"
        placeholder="userId"
        :value="profileUpdateForm.userId"
        @keyup="(evt) => {profileUpdateForm.set(evt.target.name, evt.target.value)}"
      />
      <br>
      <input
        type="email"
        name="email"
        placeholder="email"
        :value="profileUpdateForm.email"
        @keyup="(evt) => {profileUpdateForm.set(evt.target.name, evt.target.value)}"
      />
      <small>{{profileUpdateForm.validateErrorEmail}}</small>
      <br>
      <input
        type="text"
        name="fullName"
        placeholder="fullName"
        :value="profileUpdateForm.fullName"
        @keyup="(evt) => {profileUpdateForm.set(evt.target.name, evt.target.value)}"
      />
      <small>{{profileUpdateForm.validateErrorFullName}}</small>
      <br>
      <input
        type="text"
        name="address"
        placeholder="address"
        :value="profileUpdateForm.address"
        @keyup="(evt) => {profileUpdateForm.set(evt.target.name, evt.target.value)}"
      />
      <small>{{profileUpdateForm.validateErrorAddress}}</small>
      <br>
      <input
        type="text"
        name="phone"
        placeholder="phone"
        :value="profileUpdateForm.phone"
        @keyup="(evt) => {profileUpdateForm.set(evt.target.name, evt.target.value)}"
      />
      <small>{{profileUpdateForm.validateErrorPhone}}</small>
      <br>
      <input
        type="text"
        name="country"
        placeholder="country"
        :value="profileUpdateForm.country"
        @keyup="(evt) => {profileUpdateForm.set(evt.target.name, evt.target.value)}"
      />
      <small>{{profileUpdateForm.validateErrorCountry}}</small>
      <br>
      <input
        type="text"
        name="state"
        placeholder="state"
        :value="profileUpdateForm.state"
        @keyup="(evt) => {profileUpdateForm.set(evt.target.name, evt.target.value)}"
      />
      <small>{{profileUpdateForm.validateErrorState}}</small>
      <br>

      <button @click="profileUpdateForm.submit()" >Submit</button>
    </div>

    <br>
    <br>
    <br>

    <vue-json-pretty
      :data="JSON.parse(stringify(signupForm))"
      showLength
      :deep="0"
    />

    <div class="form">
      <h5>Sign up form</h5>
      <input
        type="email"
        name="email"
        placeholder="email"
        :value="signupForm.email"
        @keyup="(evt) => {signupForm.set(evt.target.name, evt.target.value)}"
      />
      <small>{{signupForm.validateErrorEmail}}</small>
      <br>
      <input
        type="password"
        name="password"
        placeholder="password"
        :value="signupForm.password"
        @keyup="(evt) => {signupForm.set(evt.target.name, evt.target.value)}"
      />
      <small>{{signupForm.validateErrorPassword}}</small>
      <br>
      <input
        type="password"
        name="password_confirmation"
        placeholder="password_confirmation"
        :value="signupForm.password_confirmation"
        @keyup="(evt) => {signupForm.set(evt.target.name, evt.target.value)}"
      />
      <small>{{signupForm.validateErrorPassword_confirmation}}</small>
      <br>
      <input
        type="text"
        name="fullName"
        placeholder="fullName"
        :value="signupForm.fullName"
        @keyup="(evt) => {signupForm.set(evt.target.name, evt.target.value)}"
      />
      <small>{{signupForm.validateErrorFullName}}</small>
      <br>
      <input
        type="text"
        name="address"
        placeholder="address"
        :value="signupForm.address"
        @keyup="(evt) => {signupForm.set(evt.target.name, evt.target.value)}"
      />
      <small>{{signupForm.validateErrorAddress}}</small>
      <br>
      <input
        type="text"
        name="phone"
        placeholder="phone"
        :value="signupForm.phone"
        @keyup="(evt) => {signupForm.set(evt.target.name, evt.target.value)}"
      />
      <small>{{signupForm.validateErrorPhone}}</small>
      <br>
      <input
        type="text"
        name="type"
        placeholder="type"
        :value="signupForm.type"
        @keyup="(evt) => {signupForm.set(evt.target.name, evt.target.value)}"
      />
      <small>{{signupForm.validateErrorType}}</small>
      <br>
      <input
        type="text"
        name="country"
        placeholder="country"
        :value="signupForm.country"
        @keyup="(evt) => {signupForm.set(evt.target.name, evt.target.value)}"
      />
      <small>{{signupForm.validateErrorCountry}}</small>
      <br>
      <input
        type="text"
        name="state"
        placeholder="state"
        :value="signupForm.state"
        @keyup="(evt) => {signupForm.set(evt.target.name, evt.target.value)}"
      />
      <small>{{signupForm.validateErrorState}}</small>
      <br>

      <button @click="signupForm.submit()" >Submit</button>
    </div>

    <br>
    <br>
    <br>

    <vue-json-pretty
      :data="JSON.parse(stringify(fpForm))"
      showLength
      :deep="0"
    />

    <div class="form">
      <h5>Forgot password form</h5>
      <input
        type="text"
        name="email"
        placeholder="email"
        :value="fpForm.email"
        @keyup="(evt) => {fpForm.set(evt.target.name, evt.target.value)}"
      />
      <small>{{fpForm.validateErrorEmail}}</small>
      <br>

      <button @click="fpForm.submit()" >Submit</button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { Observer } from 'mobx-vue'
import store from '../stores/RootStore'
import VueJsonPretty from 'vue-json-pretty'
import stringify from 'json-stringify-safe'

@Observer
@Component({
  components: {
    VueJsonPretty
  }
})
export default class Auth extends Vue {
  stringify = stringify
  loginForm = store.loginForm
  fpForm = store.forgotPasswordForm
  signupForm = store.signupForm
  profileUpdateForm = store.profileUpdateForm
}
</script>
