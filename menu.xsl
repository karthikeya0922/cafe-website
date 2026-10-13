<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" encoding="UTF-8"/>

    <xsl:template match="/menu">
        <html>
            <head>
                <title><xsl:value-of select="@cafe"/> - Menu (XML)</title>
                <style>
                    body { font-family: Arial, sans-serif; background: #1e1410; color: white; padding: 30px; }
                    h1 { color: #ff623d; }
                    table { border-collapse: collapse; width: 100%; max-width: 800px; }
                    th, td { padding: 10px 14px; border-bottom: 1px solid #555; text-align: left; }
                    th { background: #ff623d; }
                    tr:hover td { background: rgba(255, 255, 255, .06); }
                    .veg { color: #4caf50; font-weight: bold; }
                    .nonveg { color: #e53935; font-weight: bold; }
                    .price { text-align: right; }
                </style>
            </head>
            <body>
                <h1><xsl:value-of select="@cafe"/> Menu</h1>
                <p>Total items: <xsl:value-of select="count(item)"/></p>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th class="price">Price</th>
                    </tr>
                    <xsl:for-each select="item">
                        <xsl:sort select="category"/>
                        <tr>
                            <td><xsl:value-of select="@id"/></td>
                            <td><xsl:value-of select="name"/></td>
                            <td><xsl:value-of select="category"/></td>
                            <td>
                                <xsl:choose>
                                    <xsl:when test="@veg = 'no'"><span class="nonveg">Non-veg</span></xsl:when>
                                    <xsl:otherwise><span class="veg">Veg</span></xsl:otherwise>
                                </xsl:choose>
                            </td>
                            <td>
                                <xsl:choose>
                                    <xsl:when test="description"><xsl:value-of select="description"/></xsl:when>
                                    <xsl:otherwise>-</xsl:otherwise>
                                </xsl:choose>
                            </td>
                            <td class="price"><xsl:value-of select="price/@currency"/>&#160;<xsl:value-of select="price"/></td>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
