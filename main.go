package main

import (
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// setup env
	envErr := godotenv.Load(".env")
	if envErr != nil {
		panic(envErr)
	}

	port := os.Getenv("PORT")

	// setup http router
	router := gin.Default()
	router.Use(gin.Recovery())

	publicDirPath := "./public"
	outputFilePath := "./out/"

	// build client components
	clientComponentsPath := "./public/components/client"

	clientComponentFiles, err := os.ReadDir(clientComponentsPath)
	if err != nil {
		panic("Failed to read client components dir.")
	}

	components := ""
	componentsCss := ""
	componentsJs := ""

	for _, file := range clientComponentFiles {
		if !file.IsDir() {
			if strings.Contains(file.Name(), ".html") {
				componentName := strings.Split(file.Name(), ".html")[0]

				componentFilePath := clientComponentsPath + "/" + componentName

				componentHtmlBytes, htmlErr := os.ReadFile(componentFilePath + ".html")
				componentCssBytes, cssErr := os.ReadFile(componentFilePath + ".css")
				componentJsBytes, jsErr := os.ReadFile(componentFilePath + ".js")

				component := ""
				args := []string{}

				if htmlErr != nil {
					panic("Failed to read html component file \"" + componentName + "\"")
				}
				componentHtml := string(componentHtmlBytes)
				for _, arg := range strings.Split(componentHtml, "{{ ")[1:] {
					arg = strings.Split(arg, " }}")[0]
					componentHtml = strings.ReplaceAll(componentHtml, "{{ "+arg+" }}", "${"+arg+"}")
					if !stringInList(args, strings.Split(arg, ".")[0]) {
						args = append(args, strings.Split(arg, ".")[0])
					}
				}
				component += componentHtml

				componentCss := ""
				if cssErr == nil && string(componentCssBytes) != "" {
					componentCss = string(componentCssBytes)
					componentsCss += "<style component=\"" + componentName + "\" client>\n" + componentCss + "\n</style>\n"
				}

				componentJs := ""
				if jsErr == nil && string(componentJsBytes) != "" {
					componentJs = string(componentJsBytes)
					componentsJs += "<script component=\"" + componentName + "\" client>\n" + componentJs + "\n</script>\n"
				}

				components += "const " + componentName + "_component = (" + strings.Join(args, ",") + ") => { return `" + component + "` }\n\n"
			}
		}
	}

	// get server components
	serverComponentNames := []string{}
	serverComponents := []string{}
	serverComponentStyles := []string{}
	serverComponentScripts := []string{}

	serverComponentsPath := "./public/components/server"

	serverComponentFiles, err := os.ReadDir(serverComponentsPath)
	if err != nil {
		panic("Failed to read server components dir.")
	}

	for _, file := range serverComponentFiles {
		if !file.IsDir() {
			if strings.Contains(file.Name(), ".html") {
				componentName := strings.Split(file.Name(), ".html")[0]

				component := ""

				componentHtmlBytes, componentHtmlErr := os.ReadFile(serverComponentsPath + "/" + componentName + ".html")
				componentCssBytes, componentCssErr := os.ReadFile(serverComponentsPath + "/" + componentName + ".css")
				componentJsBytes, componentJsErr := os.ReadFile(serverComponentsPath + "/" + componentName + ".js")

				if componentHtmlErr != nil {
					panic("Failed to read server component " + file.Name())
				}
				component = string(componentHtmlBytes)

				if componentCssErr == nil && string(componentCssBytes) != "" {
					serverComponentStyles = append(serverComponentStyles, "\n<style component=\""+componentName+"\" server>\n"+string(componentCssBytes)+"\n</style>")
				}

				if componentJsErr == nil && string(componentJsBytes) != "" {
					serverComponentScripts = append(serverComponentScripts, "\n<script component=\""+componentName+"\" server>\n"+string(componentJsBytes)+"\n</script>")
				}

				serverComponentNames = append(serverComponentNames, componentName)
				serverComponents = append(serverComponents, component)
			}
		}
	}

	// stitch global files
	globalCssFileDir := publicDirPath + "/css/global"
	globalCss := ""

	globalCssFiles, err := os.ReadDir(globalCssFileDir)
	if err != nil {
		panic("Failed to read global css dir.")
	}

	for _, file := range globalCssFiles {
		if !file.IsDir() {
			if strings.Contains(file.Name(), ".css") {
				cssBytes, cssErr := os.ReadFile(globalCssFileDir + "/" + file.Name())
				if cssErr != nil {
					panic("Failed to read page html file " + file.Name())
				}
				globalCss += "\n<style file=\"" + file.Name() + "\" global>\n" + string(cssBytes) + "\n</style>"
			}
		}
	}

	globJsFileDir := publicDirPath + "/js/global"
	globalJs := ""

	globJsFiles, err := os.ReadDir(globJsFileDir)
	if err != nil {
		panic("Failed to read global js dir.")
	}

	for _, file := range globJsFiles {
		if !file.IsDir() {
			if strings.Contains(file.Name(), ".js") {
				jsBytes, jsErr := os.ReadFile(globJsFileDir + "/" + file.Name())
				if jsErr != nil {
					panic("Failed to read page html file " + file.Name())
				}
				globalJs += "\n<script file=\"" + file.Name() + "\" global>\n" + string(jsBytes) + "\n</script>"
			}
		}
	}

	// build pages
	htmlFileDir := publicDirPath + "/html"
	publicHtmlFiles, err := os.ReadDir(htmlFileDir)
	if err != nil {
		panic("Failed to read public html dir.")
	}

	for _, file := range publicHtmlFiles {
		if !file.IsDir() {
			if strings.Contains(file.Name(), ".html") {
				pageName := strings.Split(file.Name(), ".html")[0]

				page := ""

				pageHtmlBytes, htmlErr := os.ReadFile(publicDirPath + "/html/" + pageName + ".html")
				pageCssBytes, cssErr := os.ReadFile(publicDirPath + "/css/" + pageName + ".css")
				pageJsBytes, jsErr := os.ReadFile(publicDirPath + "/js/" + pageName + ".js")

				if htmlErr != nil {
					panic("Failed to read page html file " + pageName)
				}
				page += string(pageHtmlBytes)

				if cssErr == nil && string(pageCssBytes) != "" {
					page += "\n<style>\n" + string(pageCssBytes) + "\n</style>\n"
				}

				if jsErr == nil && string(pageJsBytes) != "" {
					page += "\n<script>\n" + string(pageJsBytes) + "\n</script>\n"
				}

				page += globalCss
				page += globalJs
				page += "\n<script components>\n" + components + "\n</script>\n"
				page += componentsCss
				page += componentsJs

				for _, serverComponentStyle := range serverComponentStyles {
					page += serverComponentStyle
				}
				for _, serverComponentScript := range serverComponentScripts {
					page += serverComponentScript
				}

				os.Remove(outputFilePath + pageName + ".html")
				os.WriteFile(outputFilePath+pageName+".html", []byte(page), os.ModeAppend)
			}
		}
	}

	router.GET("/", func(c *gin.Context) {
		pageHtml := getPageHtml("index", outputFilePath, serverComponentNames, serverComponents)
		if pageHtml == "" {
			c.Status(http.StatusNotFound)
			return
		}

		c.Header("Content-Type", "text/html; charset=utf-8")
		c.String(http.StatusOK, pageHtml)
	})

	router.GET("/:page", func(c *gin.Context) {
		page := c.Param("page")

		if page == "index" {
			c.Redirect(http.StatusPermanentRedirect, "/")
		}

		pageHtml := getPageHtml(page, outputFilePath, serverComponentNames, serverComponents)
		if pageHtml == "" {
			c.Status(http.StatusNotFound)
			return
		}

		c.Header("Content-Type", "text/html; charset=utf-8")
		c.String(http.StatusOK, pageHtml)
	})

	router.Static("/assets", "./public/assets")

	err = router.Run(":" + port)
	if err != nil {
		panic(err)
	}
}

func getPageHtml(page string, outputFilePath string, serverComponentNames []string, serverComponents []string) string {
	filePath := outputFilePath + page + ".html"

	err := os.Chmod(filePath, 0777)
	if err != nil {
		fmt.Println(err)
	}

	pageBytes, err := os.ReadFile(filePath)
	if err != nil {
		return ""
	}

	pageHtml := string(pageBytes)

	if page == "index" {
		page = "Home"
	}

	i := 0
	for _, componentName := range serverComponentNames {
		component := serverComponents[i]
		component = strings.ReplaceAll(component, "{{ title }}", page)
		pageHtml = strings.ReplaceAll(pageHtml, "{{{ "+componentName+" }}}", component)
		i++
	}

	pageHtml = strings.ReplaceAll(pageHtml, "{{ url }}", os.Getenv("URL"))
	pageHtml = strings.ReplaceAll(pageHtml, "{{ api }}", os.Getenv("API"))

	return pageHtml
}

func stringInList(list []string, target string) bool {
	for _, item := range list {
		if item == target {
			return true
		}
	}
	return false
}
