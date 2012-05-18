# NodeJS Windows Azure URL Shortener

This is a little app that was written in an attempt to hack on some NodeJS + Azure + Azure Table Storage.

![Alt text](/path/to/img.jpg)

## Installation (using PowerShell)

* git clone git@github.com:AgileBusinessCloud/NodeJS-Azure-URLShortener.git
* cd NodeJS-Azure-URLShortener
* edit the generated Web.cloud.config file and add appSettings nodes
* Type in PowerShell: <code>Start-AzureEmulator -launch</code>

## Sample Web.cloud.config

```
<?xml version="1.0" encoding="utf-8"?>
<!--
  For more information on how to configure your ASP.NET application, please visit
  http://go.microsoft.com/fwlink/?LinkId=169433
  -->
<configuration>

	<!-- http://windows.azure.com portal -->
  <appSettings>
    <add key="AZURE_STORAGE_ACCOUNT" value="{ENTER SUBSCRIPTION ID HERE}"/>
    <add key="AZURE_STORAGE_ACCESS_KEY" value="{ENTER KEY HERE}"/>
  </appSettings>
  
  <system.webServer>
    <modules runAllManagedModulesForAllRequests="false" />
    
    <!-- NOTE: By default, debugging and logging are unsecure and should not be enabled for production applications in the cloud.-->
    <iisnode 
      debuggingEnabled="false"
      loggingEnabled="false"
      devErrorsEnabled="false"
    />

    <!-- indicates that the server.js file is a node.js application 
    to be handled by the iisnode module -->
    <handlers>
      <add name="iisnode" path="server.js" verb="*" modules="iisnode" />
    </handlers>
    <rewrite>
      <rules>
        <clear />
        <rule name="app" enabled="true" patternSyntax="ECMAScript" stopProcessing="true">
            <match url="server\.js.+" negate="true" />
            <conditions logicalGrouping="MatchAll" trackAllCaptures="false" />
            <action type="Rewrite" url="server.js" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```

## Apache 2.0 License

<pre>
Copyright 2012 Jaime Bueza

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
</pre>