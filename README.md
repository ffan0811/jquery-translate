# jQuery Translate #

json파일을 읽어들여와 view에서 다국어 번역을 지원하는 jquery plugin입니다.


## Change log

[Change log](./docs/Changelog.md)


## How to use

../language/english/sample.json
```
{
	"ph" : "Write something..."
	"greeting" : "Hello",
	"args" : "{0}, {1}",
	"data-a" : "A",
	"data-b" : "B"
}
```

../language/korean/sample.json
```
{
	"ph" : "내용을 작성하세요..."
	"greeting" : "안녕하세요",
	"args" : "{0}, {1}",
	"data-a" : "에이",
	"data-b" : "비"
}
```

view file
```

...

<textarea data-translate-placeholder='ph' data-translate='greeting'>something</textarea>
<div data-translate-myattr="args[data-a]" data-translate="args[data-a, data-b, data-c]">args</div>

<script type="language" src="sample.json"></script>
<script src="../jquery.js"></script>
<script src="../jquery-translate-latest.js"></script>
<script>
	$.translate.initialize();
</script>

```


### Output

```

...

<textarea data-translate-placeholder='ph' data-translate='greeting' placeholder='Write something...'>Hello</textarea>
<div data-translate-myattr="args[data-a]" data-translate="args[data-a, data-b, data-c]" myattr="A, {1}">A, B, data-c</div>
```


## Options

**미리 구성하기**
```
<script>
	$.translate.defaults.filepath = ...;
	$.translate.defaults.language = ...;
	...
</script>
```


**생성자에 전달하기**
```
<script>
	var $el = $('#my-noti-container').notify({
		'filepath' : ...,
		'language' : ...	
	});
</script>
```


### Properties

Property | Type | Default | Version | Description
--- | --- | --- | --- | ---
filepath | String | '/language/' | 0.1.0 | 언어파일이 존재하는 디렉토리 경로입니다.
language | String | 'english' | 0.1.0 | 기본적으로 호출할 언어를 설정합니다.
type | String | 'language' | 0.1.0 | 언어 스크립트의 type attribute를 감지할 문자열입니다.\


### Methods

changeLanguage(lang)
getLanguage(key)