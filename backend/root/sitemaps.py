from django.contrib import sitemaps
from django.urls import reverse


class RootStaticViewSitemap(sitemaps.Sitemap):
    priority = 0.5
    changefreq = "daily"

    def items(self):
        return ["root:home" , "root:aboutus"]

    def location(self, item):
        return reverse(item)