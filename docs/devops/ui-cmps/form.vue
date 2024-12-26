<template>
    <div class="form-item" style="margin: 100px auto;width: 300px;">
        <input type="email" class="form-control" placeholder="email*">
        <label class="floating-label">email*</label>
        <small></small>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

input {
    /*  suppressing native form control styling. */
    appearance: none;
    font-size: 1rem;
    line-height: 1.5rem;
    --tw-shadow: 0 0 #0000;
    border-width: 1px;
}
input::placeholder {
  color: transparent;
}

.form-item {
    position: relative;
}

.form-control {
    height: 3.5rem;
    width:100%;
    border-radius: .75rem;
    background-color: white;
    border-color:#b5b5b5;
    --tw-border-opacity:1;
    border-color:rgb(219 219 219/var(--tw-border-opacity))
}

.form-control:hover {
    border-color: #66afe9;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
}

.floating-label {
    transition: all 0.2s ease-in-out;
    position: absolute;
    left: .75rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    display: hidden;
}
/* .floating-label:has(+ .from-control:not(:foucs):not(:placeholder-shown)) {
    display: block;
    font-size:1rem;
    line-height:1.5rem;
    color: #1F3245;
} */

/* .floating-label:has(+ .form-control:focus) {
    display: block;
    top: 0.125rem;
    font-size:10px;
    font-weight: 700;
    color: #1e90ff;
} */

input:focus ~ .floating-label,
input:not(:focus):not(:placeholder-shown) ~ .floating-label {
    display: block;
    top: 0.125rem;
    font-size: 1rem;
    font-weight: 700;
    color: #1e90ff;
    opacity: 1;
}


input:invalid ~ small::before,
input:invalid ~ small::before {
    content: "✖";
    color: red;
}

input:valid ~ small::before,
input:valid ~ small::before  {
  content: "✓";
  color: green;
}

.form-control::placeholder {
    opacity: 0;
    /* color: transparent; */
}
</style>