import{_ as n,c as a,a4 as p,o as i}from"./chunks/framework.su6J3y5l.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"deploy/docker/qucik-start.md","filePath":"deploy/docker/qucik-start.md","lastUpdated":1732976097000}'),e={name:"deploy/docker/qucik-start.md"};function l(t,s,r,c,o,h){return i(),a("div",null,s[0]||(s[0]=[p(`<h2 id="最小可用env-setup" tabindex="-1">最小可用env setup <a class="header-anchor" href="#最小可用env-setup" aria-label="Permalink to &quot;最小可用env setup&quot;">​</a></h2><p>install with prefer package</p><p>build from binary source</p><h2 id="install-from-centos" tabindex="-1">install from centos <a class="header-anchor" href="#install-from-centos" aria-label="Permalink to &quot;install from centos&quot;">​</a></h2><p>利用vagrant配置文件创建两台虚拟机</p><div class="language-sh vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vagrant</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> up</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vagrant</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> status</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="vp-code-block-title"><div class="vp-code-block-title-bar"><span class="vp-code-block-title-text" data-title="Vagrantfile">Vagrantfile</span></div><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>Vagrant.require_version &quot;&gt;= 1.6.0&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>boxs = [</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    name: &quot;docker-node1&quot;,</span></span>
<span class="line"><span>    :eth1: &quot;192.168.205.10&quot;,</span></span>
<span class="line"><span>    :mem: &quot;1024&quot;,</span></span>
<span class="line"><span>    :cpu: &quot;1&quot;</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    name: &quot;docker-node2&quot;,</span></span>
<span class="line"><span>    :eth1: &quot;192.168.205.11&quot;,</span></span>
<span class="line"><span>    :mem: &quot;1024&quot;,</span></span>
<span class="line"><span>    :cpu: &quot;1&quot;</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>]</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>Vagrant.configure(2) do |config|</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  config.vm.box = &quot;centos/7&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  boxes.each do |opts|</span></span>
<span class="line"><span>    config.vm.define opts[:name] do |config|</span></span>
<span class="line"><span>      config.vm.hostname = opts:[:name]</span></span>
<span class="line"><span>      config.vm.provider  &quot;vmware_fusion&quot; do |v|</span></span>
<span class="line"><span>        v.vmx[&#39;memsize&#39;] = opts[:mem]</span></span>
<span class="line"><span>        v.vmx[&#39;numvcpus&#39;] = opts[:cpu]</span></span>
<span class="line"><span>      end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      config.vm.provider &quot;virtualbox&quot; do |v|</span></span>
<span class="line"><span>      v.customize [&quot;modifyvm&quot;, :id, &quot;--memory&quot;, opts[:mem]]</span></span>
<span class="line"><span>      v.customize [&quot;modifyvm&quot;, :id, &quot;--cpus&quot;, opts[:cpu]]</span></span>
<span class="line"><span>      end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      config.vm.network :private_network, ip: opts[:eth1]</span></span>
<span class="line"><span>      end</span></span>
<span class="line"><span>  end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  config.vm.sync_folder &quot;./labs&quot;, &quot;/home/vagrant/labs&quot;</span></span>
<span class="line"><span>  config.vm.provision &quot;shell&quot;, privileged: true, path: &quot;./setup.sh&quot;</span></span>
<span class="line"><span>end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br></div></div></div><div class="vp-code-block-title"><div class="vp-code-block-title-bar"><span class="vp-code-block-title-text" data-title="setup.sh">setup.sh</span></div><div class="language-sh vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/bin/sh</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># install tools</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> yum</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -y</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nvim</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gcc</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> glibc-static</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> telnet</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> bridge-utils</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># install docker</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">curl</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -fsSL</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> get.docker.com</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -o</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> get-docker.sh</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sh</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> get-docker.sh</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># start docker service</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> groupadd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docker</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> usermod</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -aG</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vagrant</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> start</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docker</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">rm</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -rf</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> get-docker.sh</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div></div><h3 id="代理端口转发" tabindex="-1">代理端口转发 <a class="header-anchor" href="#代理端口转发" aria-label="Permalink to &quot;代理端口转发&quot;">​</a></h3><h2 id="service-up-and-running" tabindex="-1">service up and running <a class="header-anchor" href="#service-up-and-running" aria-label="Permalink to &quot;service up and running&quot;">​</a></h2>`,10)]))}const b=n(e,[["render",l]]);export{d as __pageData,b as default};
